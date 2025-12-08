/**
 * Add ALL Test 4 English explanations to database
 * 75 questions across 5 passages
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EXPLANATIONS = [
  // PASSAGE 1: Yueming in Philadelphia's Chinatown (Q1-15)
  {
    test: 4,
    question: 1,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (blizzards)</strong> because "snowy blizzards" is redundant—blizzards are by definition snowy storms, so adding "snowy" or "of snowfall" is unnecessary.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("snowy blizzards"):</strong> Redundant; blizzards are already snowy.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("blizzards of snowfall"):</strong> Also redundant; blizzards inherently involve snowfall.</div>
<div><strong style="font-weight: 600;">Choice C ("blizzards of snow"):</strong> Still redundant for the same reason.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 2,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (them,)</strong> because the pronoun must refer to "The New Year's festivities, fifteen days" mentioned earlier. "Them" correctly refers to the festivities that last fifteen days.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("it"):</strong> Incorrect number agreement; "it" is singular but refers to plural festivities.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("such"):</strong> Vague and doesn't clearly establish the referent.</div>
<div><strong style="font-weight: 600;">Choice J ("this"):</strong> Also vague and doesn't properly refer to the plural festivities.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 3,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (snapped)</strong> because "snapped" suggests a sudden, immediate effect—the cold air instantly brought Yueming out of her daze.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("pulled"):</strong> Suggests a gradual action, not an immediate effect.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("lured"):</strong> Implies temptation or attraction, which doesn't fit the context.</div>
<div><strong style="font-weight: 600;">Choice D ("drew"):</strong> Also suggests a gradual process rather than an immediate jolt.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 4,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (one, <i>The History of Chinatown</i>,)</strong> because the title is an appositive that renames "one" (the mural), requiring commas before and after. The title should not have a comma inside the italics.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> Missing the opening comma before the appositive and has an incorrect comma inside the title.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G (one:):</strong> A colon is incorrect here; appositives require commas.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Missing the necessary commas to set off the appositive.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 5,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (snow working)</strong> because this creates a participial phrase modifying "snow" without unnecessary commas. The phrase describes how the snow works magic with the colors.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("snow, working"):</strong> The comma incorrectly separates the participial phrase from what it modifies.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("snow was working,"):</strong> Creates a comma splice by adding a second independent clause.</div>
<div><strong style="font-weight: 600;">Choice C ("snow working,"):</strong> The comma after "working" is unnecessary and incorrect.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 6,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (others caught up in railroad construction)</strong> because "railroad construction" is a specific type of work distinct from the previously mentioned "clothes iron" work, fulfilling the question's requirement.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("gripping it with an enormous hand"):</strong> Doesn't indicate a specific type of work.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("in the center of the image"):</strong> Describes location, not a type of work.</div>
<div><strong style="font-weight: 600;">Choice J ("others hard at work"):</strong> Too general; doesn't specify the type of work.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 7,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (off guard, incongruous)</strong> because "incongruous" is a parenthetical element that needs to be set off with commas before and after. The comma after "guard" starts the interruption, and the comma after "incongruous" ends it.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("off guard, incongruous,"):</strong> The comma after "incongruous" should come before "as" at the end.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("off guard incongruous,"):</strong> Missing the comma before "incongruous."</div>
<div><strong style="font-weight: 600;">Choice D ("off guard incongruous"):</strong> Missing both necessary commas.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 8,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (DELETE the underlined portion)</strong> because "Philadelphia's urban city" is wordy and redundant. Simply "traffic" is clear and concise.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("Philadelphia's urban city"):</strong> Redundant and wordy; "urban city" is repetitive.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("the city of Philadelphia's urban"):</strong> Even wordier and awkward.</div>
<div><strong style="font-weight: 600;">Choice H ("in-town vehicular car"):</strong> Extremely redundant and awkward phrasing.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 9,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (tomorrow. After this visit, their)</strong> because it properly separates two complete thoughts with a period, then starts a new sentence clarifying the timing of the next visit.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("tomorrow after this visit, their"):</strong> Creates a confusing run-on without proper punctuation.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("tomorrow, after this visit, their"):</strong> The commas create a confusing structure.</div>
<div><strong style="font-weight: 600;">Choice D ("tomorrow. Their"):</strong> Omits important clarifying information about "after this visit."</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 10,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (Yueming had to)</strong> because it creates a complete sentence with a clear subject. The sentence describes what Yueming had to do (tell them about her decision).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("Having to"):</strong> Creates a sentence fragment; lacks a subject.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("Her having to"):</strong> Awkward and creates an unclear construction.</div>
<div><strong style="font-weight: 600;">Choice J ("To"):</strong> Also creates a fragment without a clear subject.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 11,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (of)</strong> because the correct idiom is "tell them of her decision," not "tell them over her decision." The preposition "of" properly introduces the object of what she would tell them.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("over"):</strong> Incorrect idiom; you don't "tell someone over" something.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("with"):</strong> Also incorrect; "tell them with her decision" doesn't make sense.</div>
<div><strong style="font-weight: 600;">Choice D ("in"):</strong> Similarly incorrect idiom.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 12,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (paint herself instead into)</strong> because it connects Yueming figuratively to the mural described earlier in the essay—she would become part of the immigrant story depicted in the painting.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("remain instead in"):</strong> Doesn't create the figurative connection to the mural.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("not leave"):</strong> Too literal; misses the figurative connection.</div>
<div><strong style="font-weight: 600;">Choice J ("take"):</strong> Doesn't establish the mural connection.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 13,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (direction. It belonged)</strong> because starting a new sentence with "It belonged" creates a clear, grammatically correct structure. The laughter turned the corner, then the sentence explains who the laughter belonged to.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("direction, which belonged"):</strong> Creates a nonrestrictive clause that awkwardly modifies "direction."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("direction that belonged"):</strong> Also awkwardly suggests the direction itself belonged to the group.</div>
<div><strong style="font-weight: 600;">Choice D ("direction belonging"):</strong> Creates a confusing participial phrase.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 14,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (its)</strong> because "its" is the correct possessive form (belonging to the dragon). "It's" means "it is," which is incorrect here.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("it's"):</strong> Contraction of "it is," which doesn't make sense here.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("its'"):</strong> Not a real word; incorrect apostrophe placement.</div>
<div><strong style="font-weight: 600;">Choice J (DELETE):</strong> Omitting the possessive makes "festive entirety" unclear—entirety of what?</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 15,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (Point C)</strong> because Point C separates Yueming's plans for herself (staying in America, not returning to China) from the immediate surroundings (the laughter, the dragon, the scene before her).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (Point A):</strong> Too early; still discussing her internal thoughts about staying.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B (Point B):</strong> Also too early; still focused on her decision.</div>
<div><strong style="font-weight: 600;">Choice D (Point D):</strong> Too late; already describing the immediate surroundings.</div>
</div>
</div>`
  },

  // PASSAGE 2: AQUA2 Robot (Q16-30)
  {
    test: 4,
    question: 16,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (an indication of one benefit of marine dives and how significant it is to scientists)</strong> because "invaluable" indicates significance/importance and "firsthand" indicates the benefit (direct observation).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> The sentence doesn't describe specific kinds of sea life.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The words don't convey appreciation for difficulties.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The sentence doesn't suggest who conducts dives.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 17,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (has led)</strong> because the subject is "the limited time" (singular), which requires the singular verb "has." The past participle of "lead" is "led," not "lead."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("have lead"):</strong> Wrong verb number (plural) and wrong verb form ("lead" instead of "led").</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("have led"):</strong> Wrong verb number; subject is singular.</div>
<div><strong style="font-weight: 600;">Choice D ("has lead"):</strong> Wrong verb form; past participle is "led."</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 18,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (DELETE the underlined portion and end the sentence with a period)</strong> because the phrase is redundant—we already know from context that robots would help conduct observations.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("in an assistive capacity"):</strong> Wordy and redundant.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("as aides to scientists' underwater studies"):</strong> Also redundant.</div>
<div><strong style="font-weight: 600;">Choice H ("since divers' time underwater is limited"):</strong> Repeats information already stated.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 19,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (topography)</strong> because the sentence structure requires parallel items in a list: "detecting chemicals and mapping topography" are both noun phrases that serve as examples of complex functions.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("topography, and these"):</strong> Creates a run-on sentence with unclear reference.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("topography being functions that"):</strong> Awkward and breaks parallel structure.</div>
<div><strong style="font-weight: 600;">Choice C ("topography, which"):</strong> Creates an incomplete thought.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 20,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (surge)</strong> because "surge" best conveys powerful, forceful movement through water appropriate for robots using thrusters.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("cascade"):</strong> Suggests downward waterfall motion, not horizontal movement.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("flood"):</strong> Doesn't fit the context of robot movement.</div>
<div><strong style="font-weight: 600;">Choice D ("gush"):</strong> Typically describes liquid flow, not solid object movement.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 21,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (equipment, however,)</strong> because "however" is a parenthetical adverb that requires commas before and after when it appears mid-sentence.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("equipment, however"):</strong> Missing the comma after "however."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("equipment however,"):</strong> Missing the comma before "however."</div>
<div><strong style="font-weight: 600;">Choice D ("equipment however"):</strong> Missing both required commas.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 22,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (move in harmony with the creatures it would study)</strong> because the next sentence discusses swimming "as naturally as a fish squid, or...a turtle," establishing the transition to natural movement.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("use advanced imaging and electromechanical systems"):</strong> Doesn't connect to natural swimming.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("operate equally smoothly in tethered or untethered modes"):</strong> Doesn't transition to natural movement.</div>
<div><strong style="font-weight: 600;">Choice H ("perform in mere minutes tasks that take scientists hours"):</strong> Irrelevant to the swimming discussion.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 23,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (pushing the robot)</strong> because it creates a clear participial phrase with "Its flippers" as the subject performing the action of reversing and pushing.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("by doing so, they push the robot"):</strong> "They" creates unclear reference.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("then, the robot is pushed"):</strong> Passive voice and awkward construction.</div>
<div><strong style="font-weight: 600;">Choice D ("this pushes the robot"):</strong> "This" has unclear reference.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 24,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (Yes, because it provides a description that helps clarify how the legs work)</strong> because "rotate like windmill blades" provides a helpful visual description of the leg mechanism.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> The description doesn't explain how engineers came up with the design.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The windmill comparison is relevant and helpful, not unnecessary.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The description supports the paragraph's focus on land-to-water movement.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 25,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (as it is for)</strong> because this completes the parallel comparison "as suitable for studies in the Caribbean as it is for those in the Arctic."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("as well as"):</strong> Incorrect idiom; doesn't complete "as suitable...as" structure.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("but also"):</strong> Would require "not only" earlier in the sentence.</div>
<div><strong style="font-weight: 600;">Choice D ("or"):</strong> Changes the meaning; suggests one or the other, not both.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 26,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (AQUA2 can make subtle changes in course simply by)</strong> because it maintains active voice with AQUA2 as the subject, creating the clearest and most direct construction.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Wordy and uses passive construction unnecessarily.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> Passive voice; less direct than active.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Passive voice; also less direct.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 27,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (still as it gently paddles)</strong> because no commas are needed in this construction. "As it gently paddles with the other four" is a subordinate clause that flows directly from "holding two flippers still."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("still, as it gently, paddles"):</strong> Unnecessary commas disrupt the flow.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("still, as it gently, paddles"):</strong> Same problem with unnecessary commas.</div>
<div><strong style="font-weight: 600;">Choice C ("still as it gently paddles,"):</strong> The trailing comma is incorrect.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 28,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (unique ability)</strong> because it's precise and appropriately formal for describing AQUA2's hovering capability without being overly dramatic or informal.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("exquisite competency"):</strong> Overly flowery and pretentious.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("superhuman power"):</strong> Inappropriate; AQUA2 isn't human.</div>
<div><strong style="font-weight: 600;">Choice J ("weird trick"):</strong> Too informal and dismissive.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 29,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (silty lake beds in Canada,)</strong> because it maintains the same word pattern as "busy coral reefs in Barbados" (adjective + noun + "in" + location).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("the silty beds of lakes in Canada"):</strong> Different pattern with "of."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("silty Canadian lake beds"):</strong> Puts the location as an adjective, breaking the pattern.</div>
<div><strong style="font-weight: 600;">Choice D ("Canada's silty lake beds"):</strong> Uses possessive form, breaking the pattern.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 30,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (after Paragraph 4)</strong> because Paragraph 3 discusses AQUA2's land adaptability, which logically follows Paragraph 4's discussion of its underwater swimming abilities. The essay flows better discussing water capabilities first, then land capabilities.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (where it is now):</strong> Creates poor flow by jumping to land before fully discussing water capabilities.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G (after Paragraph 1):</strong> Too early; needs context about swimming first.</div>
<div><strong style="font-weight: 600;">Choice J (after Paragraph 5):</strong> Too late; would disrupt the logical progression.</div>
</div>
</div>`
  },

  // PASSAGE 3: Lancelot Jones and Biscayne National Park (Q31-45)
  {
    test: 4,
    question: 31,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (colorful orchids, rare cacti, and mangrove forests)</strong> because it provides specific, concrete examples of plant species, which is more vivid and informative than the vague "many unusual species of plants."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("many unusual species of plants"):</strong> Too vague and general.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("many species that are difficult to find in the wild"):</strong> Still vague; doesn't specify what they are.</div>
<div><strong style="font-weight: 600;">Choice D ("four distinct ecosystems"):</strong> Changes the focus from plant species to ecosystems.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 32,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (However, Lancelot Jones, one of two year-round residents of the islands,)</strong> because "However" needs a comma after it, and the appositive phrase "one of two year-round residents of the islands" should have a comma before "wanted."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> Incorrect comma placement within the appositive.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Missing comma after "However" and has incorrect internal comma.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Missing comma after "However."</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 33,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (Jones had always lived on Porgy Key,)</strong> because it's the clearest and most direct construction, with Jones as the subject performing the action of living.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("Porgy Key had always been home for Jones"):</strong> Awkward; "home to" would be better than "home for."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Jones had lived on Porgy Key his entire life"):</strong> Less clear about timing; "always" is more precise.</div>
<div><strong style="font-weight: 600;">Choice C ("Porgy Key always was a home for Jones"):</strong> Awkward and "a home" is less definitive than the correct phrasing.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 34,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (1897, and Jones grew up there, cultivating)</strong> because it correctly uses a comma before "and" to join two independent clauses, and a comma to set off the participial phrase "cultivating."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Incorrectly places comma after "Jones."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> Incorrectly places comma after "cultivating."</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Missing necessary comma before "and."</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 35,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (In)</strong> because no transition word is needed here. The sentence simply states when Jones began guiding fishing trips; there's no logical relationship requiring "Therefore," "Likewise," or "Thus."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("Therefore, in"):</strong> Implies cause-effect that isn't present.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Likewise, in"):</strong> Implies similarity that isn't being drawn.</div>
<div><strong style="font-weight: 600;">Choice C ("Thus, in"):</strong> Also implies causation unnecessarily.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 36,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (presidents, including)</strong> because "including" introduces examples and should be preceded by a comma, not a colon. A colon would be too formal and heavy for this simple list of examples.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("presidents, including:"):</strong> Colon is incorrect after "including."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("presidents, who were including"):</strong> Awkward and grammatically incorrect phrasing.</div>
<div><strong style="font-weight: 600;">Choice J ("presidents; including"):</strong> Semicolon is too heavy; comma is appropriate.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 37,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (land because)</strong> because "because" introduces a dependent clause explaining why he refused to sell, and no punctuation is needed before it.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("land; because"):</strong> A semicolon requires an independent clause after it; "because" creates a dependent clause.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("land,"):</strong> Omitting "because" removes the explanation for his refusal.</div>
<div><strong style="font-weight: 600;">Choice D ("land"):</strong> Also removes the necessary explanation.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 38,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - 1, 2, 3)</strong> because the logical order is: (1) landowners voted to found a city, (2) Jones abstained, (3) he refused to sell because he wanted conservation. This creates a clear chronological and logical flow.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G (1, 3, 2):</strong> Illogical; explaining his refusal before mentioning he abstained.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H (3, 1, 2):</strong> Starts with the reason before the action.</div>
<div><strong style="font-weight: 600;">Choice J (2, 1, 3):</strong> Mentions abstention before the vote.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 39,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (alone. Some Florida residents)</strong> because these are two complete sentences that should be separated by a period, not a comma (which would create a comma splice).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("alone, some Florida residents,"):</strong> Creates a comma splice.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("alone; some Florida residents,"):</strong> The semicolon could work, but the comma after "residents" is incorrect.</div>
<div><strong style="font-weight: 600;">Choice D ("alone, some Florida residents"):</strong> Still a comma splice without the ending comma.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 40,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (No, because it presents information that is only loosely related to the rest of the essay)</strong> because the essay focuses on Lancelot Jones and Biscayne specifically, not on comparing it to other national parks.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> The statement doesn't explain why Biscayne was a monument first.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Making comparisons isn't the essay's purpose.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> This information isn't discussed earlier in the essay.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 41,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (his)</strong> because the antecedent is Lancelot Jones (singular male), so the possessive pronoun should be "his," not the plural "their."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("their"):</strong> Plural pronoun for a singular antecedent.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("one's"):</strong> Too impersonal; we know it's Jones.</div>
<div><strong style="font-weight: 600;">Choice C ("there"):</strong> Not a possessive pronoun; indicates location.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 42,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (Service was Lancelot Jones,)</strong> because this is an inverted sentence structure ("First to sell...was Lancelot Jones"), and the appositive clause "who was permitted..." requires a comma before it.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("Service, was Lancelot Jones,"):</strong> The comma after "Service" incorrectly separates subject from verb.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("Service, was Lancelot Jones"):</strong> Same error, plus missing comma before "who."</div>
<div><strong style="font-weight: 600;">Choice J ("Service was Lancelot Jones"):</strong> Missing comma before the relative clause.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 43,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (He)</strong> because the sentence describes two actions Jones did (led fishing trips AND taught schoolchildren), connected by "and." No subordinating conjunction is needed.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("Since he"):</strong> "Since" implies causation that isn't intended.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Even though he"):</strong> "Even though" implies contrast that doesn't exist.</div>
<div><strong style="font-weight: 600;">Choice C ("Because he"):</strong> "Because" implies causation incorrectly.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 44,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (DELETE the underlined portion and end the sentence with a period)</strong> because "in exchange for teaching each class" already establishes the exchange; adding "in return for the class" is redundant.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("in return for the class"):</strong> Redundant with "in exchange for teaching each class."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("that he requested in exchange"):</strong> Also redundant and wordy.</div>
<div><strong style="font-weight: 600;">Choice H ("for teaching the class"):</strong> Redundant; we already know he's teaching.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 45,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (Point C in Paragraph 4)</strong> because Point C comes after describing the conservation efforts and right before the sentence about Johnson signing the bill—perfect timing to say "The park idea gained momentum."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (Point A in Paragraph 1):</strong> Too early; the park idea hasn't been introduced yet.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B (Point B in Paragraph 2):</strong> Still too early; conservation efforts haven't been discussed.</div>
<div><strong style="font-weight: 600;">Choice D (Point D in Paragraph 5):</strong> Too late; the park is already established.</div>
</div>
</div>`
  },

  // PASSAGE 4: Northern Flickers at NASA (Q46-60)
  {
    test: 4,
    question: 46,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (NASA technicians)</strong> because the sentence needs a clear subject performing the action of inspecting. "Due to" and "because" create dependent clauses that leave the sentence without a proper subject.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("due to NASA technicians"):</strong> Creates a fragment; "due to" needs a complete clause before it.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("because NASA technicians, who were"):</strong> Overly complex and creates a dependent clause.</div>
<div><strong style="font-weight: 600;">Choice J (DELETE):</strong> Leaves "inspecting" without a clear subject.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 47,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (were attempting to excavate)</strong> because the subject is "two northern flickers" (plural), requiring the plural verb "were," and the correct form is "attempting to excavate."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("was attempting to excavate"):</strong> Wrong verb number; "was" is singular.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("was attempting to be excavating"):</strong> Wrong number and awkward phrasing.</div>
<div><strong style="font-weight: 600;">Choice C ("were attempted to excavate"):</strong> Wrong voice; should be active, not passive.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 48,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (establishes that flickers are persistent and helps explain how the fuel tank came to have over two hundred punctures)</strong> because the sentence describes how flickers kept trying new spots after hitting metal, explaining the many punctures and demonstrating persistence.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The sentence doesn't describe physical features or explain how flickers locate hollow spots.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> Doesn't indicate initial attraction or what drove them away.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Doesn't identify fuel tank components or specific damaged parts.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 49,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (birds' persistence is)</strong> because "birds'" is the correct plural possessive (the persistence belonging to multiple birds), and "persistence" is singular, requiring "is."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("bird's persistence are"):</strong> Singular possessive with plural verb.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("birds' persistence are"):</strong> "Persistence" is singular, needs "is."</div>
<div><strong style="font-weight: 600;">Choice D ("birds' persistences is"):</strong> "Persistences" is incorrect; the word doesn't pluralize this way.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 50,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (Because they lack)</strong> because it correctly establishes cause-effect: because flickers lack a distinct song (cause), they drum their beaks (effect). "They" clearly refers to flickers.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("By lacking"):</strong> "By" doesn't properly establish causation.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("As opposed to lacking"):</strong> Doesn't establish the cause-effect relationship.</div>
<div><strong style="font-weight: 600;">Choice J ("Just as they lack"):</strong> Creates comparison, not causation.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 51,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (Florida, though,)</strong> because "though" is a parenthetical adverb that requires commas before and after when it appears mid-sentence.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("Florida, though"):</strong> Missing comma after "though."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Florida, though;"):</strong> Semicolon is incorrect; should be comma.</div>
<div><strong style="font-weight: 600;">Choice D ("Florida though"):</strong> Missing both required commas.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 52,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (If solid metal didn't)</strong> because it creates a logical conditional sentence: if metal didn't stop them (which it didn't), how could NASA prevent damage? This sets up the problem NASA needed to solve.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("For solid metal to"):</strong> Creates an incomplete thought.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("Although solid metal didn't"):</strong> "Although" doesn't properly set up the question that follows.</div>
<div><strong style="font-weight: 600;">Choice H ("By using solid metal to"):</strong> Doesn't make logical sense with the question.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 53,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (its)</strong> because "its" is the correct possessive form of "it" (belonging to NASA). The equipment belongs to NASA, requiring the possessive "its."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("there"):</strong> Indicates location, not possession.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("it's"):</strong> Contraction of "it is," not possessive.</div>
<div><strong style="font-weight: 600;">Choice D ("its'"):</strong> Not a real word; incorrect apostrophe placement.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 54,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (Sentence 5)</strong> because Sentence 5 shifts from discussing general flicker drumming behavior to NASA's specific concerns about the flickers at Kennedy Space Center, making it the logical place to start a new paragraph.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (Sentence 3):</strong> Still discussing drumming behavior.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G (Sentence 4):</strong> Also still describing drumming behavior.</div>
<div><strong style="font-weight: 600;">Choice J (Sentence 6):</strong> Too late; already discussing NASA's concerns.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 55,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (Likewise,)</strong> because it indicates that, similar to the previous recommendation about dead trees, the team made another recommendation about grass. "Likewise" shows parallel actions.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("For instance"):</strong> Doesn't establish the parallel with the previous recommendation.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("That is"):</strong> Implies restating, not adding a similar point.</div>
<div><strong style="font-weight: 600;">Choice D ("Indeed"):</strong> Implies emphasis or confirmation, not parallel action.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 56,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (speculated)</strong> because "speculated" emphasizes that this was a hypothesis—the BIRD team thought the tidy lawns might make insects visible, but weren't certain. This matches "hypothetical" in the question.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("determined"):</strong> Implies certainty, not hypothesis.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("contended"):</strong> Implies arguing a position, not hypothesizing.</div>
<div><strong style="font-weight: 600;">Choice J ("realized"):</strong> Implies discovery of fact, not hypothesis.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 57,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (long and giving)</strong> because "and giving" creates faulty parallelism. The sentence structure requires "let the grass grow long" followed by a participial phrase or another construction, not "and giving."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("long, which might give"):</strong> Acceptable; creates a relative clause.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("long; this might give"):</strong> Acceptable; creates a new independent clause.</div>
<div><strong style="font-weight: 600;">Choice D ("long, giving"):</strong> Acceptable; creates a participial phrase.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 58,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (No, because it detracts from the paragraph's focus on BIRD's strategies for deterring flickers)</strong> because the paragraph focuses on deterrence strategies, not detailed information about flicker diet or feather care.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> The information doesn't emphasize likelihood of leaving.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The detail doesn't demonstrate thoroughness of research.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> The plan wouldn't eliminate ants, just make them harder to see.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 59,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (DELETE the underlined portion)</strong> because no transitional word is needed. The sentence simply states that the flickers were deterred by the strategies—no contrast, incidental information, or alternative is being presented.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("alternatively"):</strong> Implies an alternative option, which isn't the case.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("incidentally"):</strong> Implies the information is tangential, but it's the main point.</div>
<div><strong style="font-weight: 600;">Choice C ("however"):</strong> Implies contrast that doesn't exist.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 60,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (No, because it focuses on a single incident in which wildlife affected the course of a launch)</strong> because the essay describes one specific event (the flickers damaging Discovery's fuel tank), not a typical launch process.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> The essay doesn't describe a standard BIRD team process.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The inspection is only briefly mentioned, not detailed.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> The essay's primary subjects are the flickers and NASA's response, not general nesting habits.</div>
</div>
</div>`
  },

  // PASSAGE 5: Pina Bausch (Q61-75)
  {
    test: 4,
    question: 61,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (their)</strong> because the antecedent is "pieces" (plural), requiring the plural possessive pronoun "their." The pieces have an expressive style.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("those"):</strong> Demonstrative pronoun, not possessive.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("that"):</strong> Also not possessive.</div>
<div><strong style="font-weight: 600;">Choice D ("its"):</strong> Singular possessive; doesn't agree with plural "pieces."</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 62,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (emotions)</strong> because "emotional feelings" is redundant—emotions are by definition feelings, so saying "emotional feelings" is like saying "feeling feelings."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("emotional feelings"):</strong> Redundant phrasing.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("expressive emotions"):</strong> Redundant; emotions are inherently expressive.</div>
<div><strong style="font-weight: 600;">Choice H ("feelings of emotion"):</strong> Also redundant and wordy.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 63,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (1920s (and up until the onset of World War II),)</strong> because the parenthetical phrase "and up until the onset of World War II" should be enclosed in parentheses, with a comma after the closing parenthesis to continue the sentence.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A:</strong> Uses period instead of comma after parentheses, creating a fragment.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Commas aren't strong enough; parenthetical information this substantial needs parentheses.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Missing necessary punctuation around the parenthetical phrase.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 64,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (Yes, because it describes features of Expressionist art with which the reader might be unfamiliar)</strong> because the description helps readers visualize what Expressionism looked like, aiding understanding of the style that influenced Bausch.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The description doesn't explain why representational modes weren't preferred.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The information isn't repeated elsewhere.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The paragraph does focus on influences on Bausch, and this supports that focus.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 65,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (grew)</strong> because the sentence needs a simple past tense verb to match "born in 1940." The sentence describes two past actions: she was born and she grew up.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("having grown"):</strong> Creates a participial phrase without a main verb.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("and grew"):</strong> "And" doesn't fit the sentence structure.</div>
<div><strong style="font-weight: 600;">Choice C ("growing"):</strong> Creates a fragment without a complete verb.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 66,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (its identity)</strong> because it maintains the parallel pattern established by "its economy, its infrastructure" —all three items use the possessive "its" followed by a noun.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("the country's national identification"):</strong> Breaks the parallel structure and is wordy.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("how it identified itself"):</strong> Breaks the parallel structure with a clause.</div>
<div><strong style="font-weight: 600;">Choice J ("an identity"):</strong> Uses "an" instead of "its," breaking the pattern.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 67,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (artists, whose)</strong> because "whose" is the correct possessive relative pronoun to show that the work belonged to the artists. "Whose work" modifies "artists."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("artists, of whom"):</strong> Incorrect construction; "of whom work" doesn't work grammatically.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("artists, who's"):</strong> "Who's" means "who is," not possessive.</div>
<div><strong style="font-weight: 600;">Choice D ("artists'"):</strong> Creates a possessive noun but no relative clause.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 68,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (resume)</strong> because "resume" means to start again or continue after a pause, which perfectly fits the context of artists being able to work again after Nazi suppression ended.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("refresh"):</strong> Means to make new or revive, not to restart after suppression.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("renew"):</strong> Similar to refresh; doesn't capture the idea of continuing after interruption.</div>
<div><strong style="font-weight: 600;">Choice J ("recur"):</strong> Means to happen again repeatedly, not the right meaning.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 69,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (after the word <i>emotions</i>)</strong> because "joy, passion, grief" are examples of emotions, so they should immediately follow the word they exemplify. The phrase "Dancers' emotions—joy, passion, grief—are conveyed through gesture" makes logical sense.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (where it is now):</strong> Places examples after "gesture," but they're examples of emotions, not gestures.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C (after "subtle"):</strong> Doesn't make logical sense in context.</div>
<div><strong style="font-weight: 600;">Choice D (after "stationary"):</strong> Also illogical placement.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 70,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (lying)</strong> because "lying" is the present participle of "to lie" (to recline). The dancer is lying (reclining) prostrate on the stage.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("having laid"):</strong> "Laid" is the past tense of "to lay" (to place something), wrong verb.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("lain down"):</strong> "Lain" is past participle; the sentence needs present participle.</div>
<div><strong style="font-weight: 600;">Choice J ("laying"):</strong> "Laying" means placing something down; wrong verb.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 71,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (stage)</strong> because without a comma or other modifier, "covered entirely with soil" clearly modifies "stage" (the nearest noun). The stage, not the dancer, is covered with soil.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("stage,"):</strong> The comma makes "covered" modify "dancer" instead of "stage."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("stage, that was"):</strong> Awkward and creates ambiguity about what was covered.</div>
<div><strong style="font-weight: 600;">Choice C ("stage, having been"):</strong> Participial phrase that could modify dancer.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 72,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (informed)</strong> because the subject is "Travel" (singular), requiring the singular verb "informed." Also, past tense "informed" is correct because the sentence describes past influence on Bausch's work.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F ("have informed"):</strong> Wrong verb number; "Travel" is singular.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("were informing"):</strong> Wrong verb number and awkward tense.</div>
<div><strong style="font-weight: 600;">Choice J ("inform"):</strong> Present tense doesn't fit the past context.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 73,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (She often incorporated and combined)</strong> because no commas are needed in this simple construction. "Incorporated and combined" are two parallel verbs joined by "and."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("She, often, incorporated, and combined"):</strong> Unnecessary commas disrupt the flow.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("She often, incorporated and combined,"):</strong> Commas incorrectly placed.</div>
<div><strong style="font-weight: 600;">Choice C ("She often incorporated, and combined"):</strong> Comma before "and" is unnecessary.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 74,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (after Paragraph 1)</strong> because Paragraph 3 discusses the historical context of German Expressionism (1920s-WWII), which provides background for understanding Bausch. This context should come right after the introduction (Paragraph 1) and before the discussion of her education (current Paragraph 2).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (where it is now):</strong> Creates chronological confusion; discusses 1920s-40s after discussing her 1955 education.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H (after Paragraph 4):</strong> Too late; background should come earlier.</div>
<div><strong style="font-weight: 600;">Choice J (after Paragraph 5):</strong> Much too late; historical background should precede, not follow, discussion of her work.</div>
</div>
</div>`
  },
  {
    test: 4,
    question: 75,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (Yes, because the essay describes Bausch's particular choreographic style and frames it within the backdrop of her life in Germany)</strong> because the essay discusses Expressionism's influence, postwar Germany's rebuilding, and how these cultural/historical events shaped Bausch's dance style.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> The essay doesn't focus on American forms or shifting national identities broadly.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> The essay isn't mainly about Tanztheater or acclaim; it's about how her style developed.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The essay does explain how her style was shaped, not just why it's relevant today.</div>
</div>
</div>`
  }
];

async function addExplanations() {
  console.log(`📝 Adding ${EXPLANATIONS.length} Test 4 explanations...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of EXPLANATIONS) {
    try {
      // First, get the question ID
      const { data: questions, error: fetchError } = await supabase
        .from('practice_test_english_questions')
        .select('id, question_number, test_number')
        .eq('test_number', item.test)
        .eq('question_number', item.question)
        .single();

      if (fetchError) {
        console.error(`❌ Error fetching Test ${item.test}, Q${item.question}:`, fetchError);
        errorCount++;
        continue;
      }

      // Update the explanation
      const { error: updateError } = await supabase
        .from('practice_test_english_questions')
        .update({ explanation: item.explanation })
        .eq('id', questions.id);

      if (updateError) {
        console.error(`❌ Error updating Test ${item.test}, Q${item.question}:`, updateError);
        errorCount++;
      } else {
        console.log(`✅ Test ${item.test}, Q${item.question}: Explanation added`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Error processing Test ${item.test}, Q${item.question}:`, err);
      errorCount++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
}

addExplanations()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
