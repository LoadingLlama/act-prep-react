/**
 * Comments Service
 * Handles all comment and voting operations for lesson discussions
 */

import { supabase } from './supabase.service';

/**
 * Fetch comments for a specific lesson
 * @param {string} lessonId - The lesson ID
 * @param {string} sortBy - Sort method: 'top', 'trending', 'recent'
 * @returns {Promise<Array>} - Array of comments with user data and vote counts
 */
export const getCommentsByLesson = async (lessonId, sortBy = 'top') => {
  try {
    // Fetch comments with votes data
    let query = supabase
      .from('lesson_comments')
      .select(`
        *,
        votes:comment_votes (
          vote_type,
          user_id
        )
      `)
      .eq('lesson_id', lessonId)
      .eq('is_deleted', false);

    // Apply sorting
    if (sortBy === 'recent') {
      query = query.order('created_at', { ascending: false });
    } else {
      // For top and trending, we'll sort after fetching
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;

    // Calculate vote scores and apply sorting
    const commentsWithScores = data.map(comment => {
      const votes = comment.votes || [];
      const upvotes = votes.filter(v => v.vote_type === 1).length;
      const downvotes = votes.filter(v => v.vote_type === -1).length;
      const score = upvotes - downvotes;

      // Trending calculation: score / hours_since_posted
      const hoursSincePosted = (Date.now() - new Date(comment.created_at).getTime()) / (1000 * 60 * 60);
      const trendingScore = score / Math.max(hoursSincePosted, 1);

      return {
        ...comment,
        upvotes,
        downvotes,
        score,
        trendingScore
      };
    });

    // Apply final sorting
    if (sortBy === 'top') {
      commentsWithScores.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'trending') {
      commentsWithScores.sort((a, b) => b.trendingScore - a.trendingScore);
    }

    // Organize into tree structure (parent-child relationships)
    const commentTree = buildCommentTree(commentsWithScores);

    return commentTree;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

/**
 * Build a tree structure from flat comment array
 * @param {Array} comments - Flat array of comments
 * @returns {Array} - Tree structure with nested replies
 */
const buildCommentTree = (comments) => {
  const commentMap = {};
  const rootComments = [];

  // First pass: create map of all comments
  comments.forEach(comment => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  // Second pass: build tree structure
  comments.forEach(comment => {
    if (comment.parent_comment_id) {
      // This is a reply
      const parent = commentMap[comment.parent_comment_id];
      if (parent) {
        parent.replies.push(commentMap[comment.id]);
      }
    } else {
      // This is a root comment
      rootComments.push(commentMap[comment.id]);
    }
  });

  return rootComments;
};

/**
 * Create a new comment
 * @param {Object} commentData - Comment data
 * @returns {Promise<Object>} - Created comment
 */
export const createComment = async (commentData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated to comment');
    }

    const { data, error } = await supabase
      .from('lesson_comments')
      .insert([
        {
          lesson_id: commentData.lessonId,
          user_id: user.id,
          parent_comment_id: commentData.parentCommentId || null,
          content: commentData.content,
          user_email: user.email,
          user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      upvotes: 0,
      downvotes: 0,
      score: 0,
      votes: [],
      replies: []
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

/**
 * Update a comment
 * @param {string} commentId - Comment ID
 * @param {string} content - New content
 * @returns {Promise<Object>} - Updated comment
 */
export const updateComment = async (commentId, content) => {
  try {
    const { data, error } = await supabase
      .from('lesson_comments')
      .update({ content })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

/**
 * Delete a comment (soft delete)
 * @param {string} commentId - Comment ID
 * @returns {Promise<void>}
 */
export const deleteComment = async (commentId) => {
  try {
    const { error } = await supabase
      .from('lesson_comments')
      .update({
        is_deleted: true,
        content: '[deleted]'
      })
      .eq('id', commentId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

/**
 * Vote on a comment
 * @param {string} commentId - Comment ID
 * @param {number} voteType - 1 for upvote, -1 for downvote
 * @returns {Promise<void>}
 */
export const voteOnComment = async (commentId, voteType) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated to vote');
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('comment_votes')
      .select('*')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
      .single();

    if (existingVote) {
      if (existingVote.vote_type === voteType) {
        // Remove vote if clicking same button
        const { error } = await supabase
          .from('comment_votes')
          .delete()
          .eq('id', existingVote.id);

        if (error) throw error;
      } else {
        // Update vote if switching
        const { error } = await supabase
          .from('comment_votes')
          .update({ vote_type: voteType })
          .eq('id', existingVote.id);

        if (error) throw error;
      }
    } else {
      // Create new vote
      const { error } = await supabase
        .from('comment_votes')
        .insert([
          {
            comment_id: commentId,
            user_id: user.id,
            vote_type: voteType
          }
        ]);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error voting on comment:', error);
    throw error;
  }
};

/**
 * Get user's vote on a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise<number|null>} - Vote type or null
 */
export const getUserVote = async (commentId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('comment_votes')
      .select('vote_type')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found" error

    return data?.vote_type || null;
  } catch (error) {
    console.error('Error getting user vote:', error);
    return null;
  }
};

export default {
  getCommentsByLesson,
  createComment,
  updateComment,
  deleteComment,
  voteOnComment,
  getUserVote
};
