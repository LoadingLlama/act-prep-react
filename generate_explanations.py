#!/usr/bin/env python3
"""
Generate highly specific explanations for all 215 diagnostic test questions.
Uses Claude API to analyze each question and generate detailed explanations.
"""

import json
import os
from anthropic import Anthropic
from supabase import create_client, Client

# Configuration
SUPABASE_URL = "https://rabavobdklnwvwsldbix.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y"

# Initialize clients
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
anthropic_client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

def load_questions():
    """Load questions from JSON file"""
    with open('/Users/cadenchiang/Desktop/act-prep-react/all_diagnostic_questions.json', 'r') as f:
        return json.load(f)

def get_choice_letter(choices, index):
    """Extract the letter from a choice string"""
    if isinstance(choices[index], str):
        # Try to extract letter from "A. text" format
        if len(choices[index]) > 0 and choices[index][0].isalpha():
            return choices[index][0]
    return chr(65 + index)  # A, B, C, D...

def generate_explanation(question, passage_text=None):
    """Generate a highly specific explanation using Claude API"""
    
    # Build the prompt
    prompt = f"""You are an expert ACT test prep tutor. Generate a HIGHLY SPECIFIC explanation for this question.

SUBJECT: {question['section'].upper()}
QUESTION #{question['question_number']}

"""
    
    if passage_text:
        prompt += f"PASSAGE:\n{passage_text}\n\n"
    
    prompt += f"QUESTION TEXT:\n{question.get('question_text', 'Choose the best answer.')}\n\n"
    
    prompt += "CHOICES:\n"
    for i, choice in enumerate(question['choices']):
        prompt += f"{choice}\n"
    
    prompt += f"\nCORRECT ANSWER: {question['correct_answer']}\n\n"
    
    prompt += """INSTRUCTIONS:
Write a complete explanation with TWO sections in HTML format:

1. FIRST SECTION: Explain why the correct answer is RIGHT
   - Be EXTREMELY specific
   - Reference actual text, numbers, or content from the question
   - Don't say generic things like "provides the most grammatically sound phrasing"
   - DO say specific things like "eliminates the weak 'there are' construction by using 'Of the thousands' to create a subordinate clause"

2. SECOND SECTION: Explain why EACH wrong answer is WRONG
   - Address EVERY incorrect choice
   - Be specific about what makes each one wrong
   - Reference the specific error or issue

FORMAT (use this exact HTML structure):
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
[SPECIFIC explanation of why correct answer works - reference actual content]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
[For each wrong choice, add a div like this:]
<div style="margin-bottom: 0.375rem;"><strong>Choice X:</strong> [Specific reason why it's wrong]</div>
</div>
</div>

Generate the explanation NOW:"""
    
    # Call Claude API
    try:
        message = anthropic_client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=2000,
            temperature=0.3,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        explanation = message.content[0].text.strip()
        return explanation
    except Exception as e:
        print(f"ERROR generating explanation for question {question['question_number']}: {e}")
        return None

def update_question_explanation(question, explanation):
    """Update the explanation in the database"""
    section = question['section']
    table_name = f"practice_test_{section}_questions"
    
    try:
        response = supabase.table(table_name).update({
            "explanation": explanation
        }).eq("id", question['id']).execute()
        
        return True
    except Exception as e:
        print(f"ERROR updating question {question['id']}: {e}")
        return False

def main():
    print("Loading questions...")
    questions = load_questions()
    print(f"Loaded {len(questions)} questions\n")
    
    # Group by section
    by_section = {
        'english': [q for q in questions if q['section'] == 'english'],
        'math': [q for q in questions if q['section'] == 'math'],
        'reading': [q for q in questions if q['section'] == 'reading'],
        'science': [q for q in questions if q['section'] == 'science']
    }
    
    print("Breakdown:")
    for section, qs in by_section.items():
        print(f"  {section.capitalize()}: {len(qs)} questions")
    
    print("\n" + "="*80)
    print("Starting explanation generation...")
    print("="*80 + "\n")
    
    total = 0
    successful = 0
    failed = 0
    
    for section, section_questions in by_section.items():
        print(f"\n### Processing {section.upper()} ({len(section_questions)} questions) ###\n")
        
        for i, question in enumerate(section_questions, 1):
            q_num = question['question_number']
            print(f"  [{i}/{len(section_questions)}] Question #{q_num}...", end=" ")
            
            # Generate explanation
            explanation = generate_explanation(question)
            
            if explanation:
                # Update database
                if update_question_explanation(question, explanation):
                    print("OK")
                    successful += 1
                else:
                    print("FAILED TO UPDATE DB")
                    failed += 1
            else:
                print("FAILED TO GENERATE")
                failed += 1
            
            total += 1
            
            # Progress report every 25 questions
            if total % 25 == 0:
                print(f"\n--- PROGRESS: {total}/215 complete ({successful} successful, {failed} failed) ---\n")
    
    print("\n" + "="*80)
    print(f"FINAL RESULTS: {successful}/{total} successful, {failed} failed")
    print("="*80)
    
    # Save sample explanations
    if successful > 0:
        samples = []
        for section_questions in by_section.values():
            if section_questions:
                samples.append(section_questions[0])
            if len(samples) >= 3:
                break
        
        with open('/Users/cadenchiang/Desktop/act-prep-react/sample_explanations.json', 'w') as f:
            json.dump(samples, f, indent=2)
        print("\nSaved sample explanations to sample_explanations.json")

if __name__ == "__main__":
    main()
