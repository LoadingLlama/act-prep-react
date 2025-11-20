const https = require('https');

const SUPABASE_URL = 'rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

function apiRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SUPABASE_URL,
      path: path,
      method: method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

const explanations = {
  61: {
    correct: `"singer and music producer Sylvia Robinson" correctly uses no commas because "singer and music producer" is a compound appositive (two related descriptors joined by "and") that together identify one person. When two appositives are joined by "and," no comma separates them from each other or from the name.`,
    B: `"singer, and music producer, Sylvia Robinson," incorrectly places commas around "and music producer" and before "Sylvia Robinson." The comma before "and" disrupts the compound appositive, and the comma after "Robinson" is unnecessary.`,
    C: `"singer and music producer, Sylvia Robinson," incorrectly places a comma before "Sylvia Robinson." When a compound appositive precedes a name in this structure, no comma is needed between the description and the name.`,
    D: `"singer, and music producer Sylvia Robinson" incorrectly places a comma before "and," which breaks up the compound appositive "singer and music producer." These two descriptors should be joined by "and" without a comma.`
  },
  62: {
    correct: `"was emerging" correctly agrees with the singular subject "hip-hop subculture" and uses past progressive tense to describe the ongoing emergence of hip-hop during that time period. Despite "art forms" appearing nearby, the true subject is "subculture" (singular).`,
    F: `"were emerging" is plural and doesn't agree with the singular subject "hip-hop subculture." The phrase "based on dance, visual art, and music art forms" is a modifying phrase; the subject is still "subculture."`,
    G: `"have emerged" uses present perfect tense and plural "have," neither of which fits. The subject is singular "subculture," and the past tense context ("At the time," "late seventies") requires past tense, not present perfect.`,
    J: `"are emerging" uses present tense when past tense is needed to match "At the time" and "late seventies." Additionally, "are" is plural, disagreeing with singular "subculture."`
  },
  63: {
    correct: `"obeyed" is concise and clear, directly stating that the crowd followed the DJ's command. This single word efficiently conveys the action without redundancy.`,
    B: `"obeyed by throwing their hands in the air" is redundant because the previous sentence already states what the DJ chanted: "Throw your hands in the air." Adding "by throwing their hands in the air" repeats information the reader already knows.`,
    C: `"heeded the DJ's call and obeyed him" is redundant because "heeded the DJ's call" and "obeyed him" mean essentially the same thing. Using both phrases is unnecessarily wordy.`,
    D: `"did what he said and obeyed" is also redundant. "Did what he said" and "obeyed" convey the same meaning, so both phrases aren't needed.`
  },
  64: {
    correct: `"rappers—" correctly uses an em dash to introduce the list of specific names that follows. The em dash creates a dramatic pause and properly sets off the explanatory list of the three rappers' names.`,
    F: `"rappers:" uses a colon, which can introduce a list but is less emphatic than an em dash. More importantly, the sentence continues after "Wonder Mike" with "to record on her label," so the punctuation needs to accommodate the continuation.`,
    H: `"rappers;" uses a semicolon incorrectly. Semicolons separate independent clauses or complex list items, but here we're introducing a simple list of names, not separating independent clauses.`,
    J: `"rappers," uses only a comma, which is insufficient for introducing and emphasizing the dramatic list of names that follows. The em dash is more appropriate for this emphatic introduction.`
  },
  65: {
    correct: `No, adding the sentence would interrupt the paragraph's discussion of how "Rapper's Delight" was created. The paragraph flows from Robinson recruiting the rappers to describing the recording process. Inserting information about Robinson and her husband's labels disrupts this focused narrative.`,
    A: `This is incorrect because the sentence doesn't suggest the Sugarhill Gang could "choose where they wanted to record." It discusses Robinson and her husband starting record labels, not the rappers having choices.`,
    B: `This is incorrect because the sentence wouldn't explain why the rappers decided to record with Robinson. The sentence is about Robinson and her husband starting labels, not about the rappers' motivations.`,
    D: `While the sentence may fail to specify time periods, this isn't the main reason to delete it. The primary issue is that it interrupts the paragraph's focus on the creation of "Rapper's Delight."`
  },
  66: {
    correct: `"Robinson had the rappers rhyme over an upbeat disco record" uses active voice with Robinson as the subject performing the action of having the rappers rhyme. This is clear, concise, and properly emphasizes Robinson's role as the producer directing the recording.`,
    F: `"an upbeat disco record provided the background that the rappers rhymed over" uses passive construction and awkward phrasing. The record doesn't "provide" anything on its own—Robinson provided it and directed the process.`,
    G: `"an upbeat disco record provided by Robinson was rhymed over by the rappers" uses double passive voice ("provided by" and "was rhymed over by"), creating an unnecessarily indirect and wordy construction.`,
    H: `"rhymes were created by the rappers over an upbeat disco record," uses passive voice ("were created by") and omits Robinson's crucial role in providing the record and directing the session.`
  },
  67: {
    correct: `Deleting "Nevertheless" is correct because no transition word is needed here. The sentence "Robinson's musical instincts and business savvy had served her well with the Sugarhill Gang" directly continues the previous paragraph's point about her success. A contrasting transition would be illogical.`,
    A: `"Nevertheless" indicates contrast or opposition, suggesting what follows contradicts what came before. However, the sentence affirms Robinson's success, which doesn't contrast with the previous paragraph about "Rapper's Delight" being successful.`,
    B: `"On the other hand" also indicates contrast, implying the following statement opposes or differs from the previous one. But the sentence continues the positive narrative about Robinson's success.`,
    C: `"As a result" suggests the following statement is a consequence of what came before. However, Robinson's instincts and savvy serving her well isn't a result of "Rapper's Delight" selling copies—it's what enabled that success.`
  },
  68: {
    correct: `"instincts and business savvy" correctly uses no commas in this compound subject consisting of two nouns joined by "and." When two nouns are connected by "and" without modifiers, no comma is needed.`,
    F: `"instincts, and, business savvy" incorrectly places commas both before and after "and." Commas should not separate compound elements (two items joined by "and") in a simple series.`,
    G: `"instincts, and, business savvy" is identical to choice F, incorrectly using commas around "and."`,
    J: `"instincts and business savvy," incorrectly places a comma after "savvy." No comma is needed between the compound subject "instincts and business savvy" and its verb "had served."`
  },
  69: {
    correct: `"Hoping" creates a participial phrase that efficiently modifies Robinson and leads into the main clause. The sentence reads: "Hoping to capitalize on her success by expanding the genre, Robinson signed Grandmaster Flash..." This is concise and grammatically correct.`,
    A: `"She hoped" creates a complete independent clause, but when followed by a comma and "Robinson signed," it creates either a comma splice or awkward construction. The sentence structure becomes unclear.`,
    B: `"She was hoping" is wordier than "Hoping" and creates the same structural problem as choice A, making the sentence awkward or grammatically incorrect.`,
    C: `"The hope was" is unnecessarily wordy and creates an awkward construction. Using the noun "hope" instead of the participle "Hoping" makes the sentence less direct and more cumbersome.`
  },
  70: {
    correct: `"helped" best conveys Robinson's supportive role. As the label owner and producer, she facilitated and enabled the group to record the track. "Helped" accurately describes her supportive, enabling role without suggesting force or mere permission.`,
    F: `"allowed" suggests Robinson merely gave permission, downplaying her active role as producer. She didn't just permit the recording; she actively facilitated it as the label owner and producer.`,
    G: `"pressured" has negative connotations of force or coercion. The passage doesn't suggest Robinson forced the group; she "helped" or enabled them as their producer.`,
    J: `"asked" incorrectly uses a comma and suggests Robinson was requesting rather than enabling. As the label owner and producer, she was in a position to facilitate, not just ask.`
  },
  71: {
    correct: `"covered" is the correct word choice for breaking new ground or addressing new territory. "Covered new...ground" is the proper idiom meaning to explore or address new areas or topics.`,
    A: `"encountered" means to meet or come across something unexpectedly. You can't "encounter ground"—you cover or break new ground. This is the wrong idiom.`,
    B: `"protected" makes no sense in this context. You don't "protect new ground" when creating innovative music. The idiom requires "covered" or "broke."`,
    D: `"filled" is incorrect. The idiom is "cover new ground" or "break new ground," not "fill new ground." Additionally, the comma after "filled" creates a punctuation error.`
  },
  72: {
    correct: `"released, so" correctly uses the coordinating conjunction "so" to show the cause-and-effect relationship: because "The Message" was different from previous singles, the rappers were hesitant. "So" properly indicates this logical consequence with the required comma before it.`,
    F: `"released because" creates a logical error. The sentence would read: "It was a far cry from the singles they had previously released because the rappers were hesitant." This suggests the previous singles were different because of current hesitation, which doesn't make logical sense.`,
    G: `"released although" creates illogical meaning. "Although" indicates contrast, but the rappers' hesitation doesn't contrast with the song being different—their hesitation results from it being different.`,
    J: `"released, for" uses "for" as a coordinating conjunction meaning "because," but this creates backward logic similar to choice F. The rappers' hesitation isn't why the song differed from previous releases.`
  },
  73: {
    correct: `"In the end" is the correct idiom for describing the final outcome or conclusion. After Robinson believed in the track despite the rappers' hesitation, "in the end" Fletcher and Melle Mel recorded it, showing the ultimate result.`,
    A: `"In the opposite fashion" doesn't make sense. There's no "opposite fashion" being described—the sentence is showing the outcome after the hesitation, not describing an opposite method.`,
    B: `"first place" is incomplete and makes no sense. The phrase "in the first place" means "initially" or "to begin with," but "first place" alone doesn't work here.`,
    C: `"same way" doesn't fit the context. The sentence isn't describing similarity; it's describing the outcome after Robinson's belief overcame the rappers' hesitation.`
  },
  74: {
    correct: `"Its socially conscious" correctly uses the possessive pronoun "its" (without an apostrophe) to show that the rhymes belong to the track "The Message," and uses the adjective "conscious" (not "conscience"). "Conscious" means aware; "conscience" is a noun meaning moral sense.`,
    G: `"Its socially conscience" incorrectly uses "conscience" (a noun) instead of "conscious" (an adjective). The phrase needs the adjective "conscious" to modify "rhymes."`,
    H: `"It's socially conscious" uses the contraction "It's" (meaning "It is") instead of the possessive "Its." The sentence would read "It is socially conscious rhymes," which is grammatically incorrect.`,
    J: `"Its socially conscience" contains the same error as choice G, using the noun "conscience" instead of the adjective "conscious."`
  },
  75: {
    correct: `"artists and securing" correctly uses parallel gerunds (verb forms ending in -ing used as nouns) in the construction "helped usher in a new generation of artists and securing Robinson's legacy." The parallel structure "usher...and securing" maintains grammatical consistency.`,
    A: `"artists, and it secured" breaks the parallel structure by changing from the infinitive construction "helped usher" to a new independent clause "it secured." This creates a comma splice and disrupts parallelism.`,
    C: `"artists and secure" incorrectly uses the base form "secure" which doesn't parallel with "usher in." The structure "helped usher in...and secure" is grammatically incorrect—it should be "helped usher...and helped secure" or use parallel gerunds.`,
    D: `"artists, securing" creates a participial phrase that could be misread as modifying "artists" rather than continuing the parallel structure of what the rhymes "helped" do.`
  }
};

function generateExplanation(questionNum) {
  const exp = explanations[questionNum];
  if (!exp) return null;

  const correctChoice = exp.correct;
  const wrongChoices = Object.keys(exp).filter(k => k !== 'correct').sort();

  const wrongChoicesHTML = wrongChoices.map(choice =>
    `<div style="margin-bottom: 0.375rem;"><strong>Choice ${choice}${choice === 'F' ? ' (NO CHANGE)' : choice === 'A' ? ' (NO CHANGE)' : ''}:</strong> ${exp[choice]}</div>`
  ).join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${correctChoice}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongChoicesHTML}
</div>
</div>`;
}

async function updateQuestions() {
  for (let i = 61; i <= 75; i++) {
    const explanation = generateExplanation(i);
    if (explanation) {
      console.log(`Updating question ${i}...`);
      const result = await apiRequest('PATCH',
        `/rest/v1/practice_test_english_questions?id=eq.${i}`,
        { explanation }
      );
      console.log(`Question ${i} updated successfully`);
    }
  }
  console.log('Questions 61-75 updated!');
}

updateQuestions().catch(console.error);
