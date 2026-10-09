/**
 * Test-Day Strategy Cards, Score Maximizers & Phrase Banks for CELPIP
 */

export interface StrategyCard {
  id: string;
  section: 'listening' | 'reading' | 'writing' | 'speaking';
  title: string;
  testedSkills: string[];
  timingPlan: string;
  trapPatterns: string[];
  scoreMaximizerTips: string[];
  templates?: { name: string; structure: string[]; phrases: string[] }[];
  phraseBank: string[];
  linkingWords: string[];
}

export const STRATEGY_CARDS: StrategyCard[] = [
  // WRITING TASK 1: EMAIL
  {
    id: 'writing_task_1',
    section: 'writing',
    title: 'Writing Task 1: Writing an Email (27 Min)',
    testedSkills: ['Register adherence', 'Addressing all 3 bullet points', 'Lexical precision', 'Paragraphing cohesion'],
    timingPlan: '3 min: Outline & decide register | 18 min: Draft (160-190 words) | 6 min: Proofread for articles, prepositions & word count',
    trapPatterns: [
      'Under-answering the 3rd bullet point (often a request or compromise)',
      'Mixing formal and informal tones (e.g., "Hey John, I am writing to apprise you...")',
      'Word count falling below 150 (penalty) or ballooning past 220 (dilutes precision)',
      'Vague complaints without actionable specifics (dates, unit numbers, solution requested)'
    ],
    scoreMaximizerTips: [
      'Devote exactly one cohesive body paragraph to each of the three bullet points in the prompt.',
      'Adopt Canadian civic decorum: polite assertiveness rather than aggressive confrontation.',
      'Always include a professional sign-off and contact availability line.',
      'Use high-band modal hedging: "I would be grateful if you could look into...", "It would be prudent to..."'
    ],
    templates: [
      {
        name: 'Formal Complaint / Strata / Municipal Notice',
        structure: [
          'Salutation: Dear Mr./Ms. [Last Name] or Dear Strata Council / Building Management,',
          'Opening Statement: State clear purpose of email with courteous formality.',
          'Paragraph 1 (Bullet 1): Describe the exact problem/situation with concrete context.',
          'Paragraph 2 (Bullet 2): Detail the adverse impact or why it requires remediation.',
          'Paragraph 3 (Bullet 3): Propose constructive solution, schedule, or request action.',
          'Closing: Reiterate appreciation, provide phone number, and professional sign-off.'
        ],
        phrases: [
          'I am writing to formally bring to your attention an ongoing concern regarding...',
          'This circumstance has caused considerable inconvenience, particularly with respect to...',
          'In order to resolve this matter expediently, I would like to propose that...',
          'I would welcome the opportunity to discuss this further at your earliest convenience.',
          'Thank you for your prompt consideration and attention to this issue.'
        ]
      },
      {
        name: 'Semi-Formal Colleague / Volunteer Coordinator',
        structure: [
          'Salutation: Dear [First Name],',
          'Opening: Friendly acknowledgment + reason for reaching out.',
          'Body Paragraphs: Directly resolve the 3 requirements.',
          'Closing: Warm offer to collaborate and friendly sign-off.'
        ],
        phrases: [
          'I hope your week is off to a productive start.',
          'I wanted to touch base regarding our upcoming team initiative...',
          'Given our current schedule, it might be advantageous to consider...',
          'Please let me know if you would like me to take the lead on this aspect.'
        ]
      }
    ],
    phraseBank: [
      'bring to your immediate attention',
      'mitigate potential complications',
      'mutually beneficial arrangement',
      'at your earliest convenience',
      'propose a constructive remedy',
      'take into consideration'
    ],
    linkingWords: ['Consequently', 'Notwithstanding this', 'In light of the circumstances', 'Furthermore', 'With regard to']
  },

  // WRITING TASK 2: SURVEY
  {
    id: 'writing_task_2',
    section: 'writing',
    title: 'Writing Task 2: Responding to Survey Questions (26 Min)',
    testedSkills: ['Decisive option selection', 'Argumentation with evidence', 'Counter-argument acknowledgment', 'Cohesion'],
    timingPlan: '3 min: Choose stance & pick 2 distinct supporting pillars | 17 min: Write 170-195 words | 6 min: Fine-tune cohesion & syntax',
    trapPatterns: [
      'Sitting on the fence (e.g., "Both options have good things, it is hard to say...") - severe penalty!',
      'Ignoring the alternative option completely (Band 11-12 requires conceding the other side’s merit then refuting it)',
      'Repeating the same reason using different words',
      'Failing to frame the response from the stakeholder perspective (e.g. employee, resident, community member)'
    ],
    scoreMaximizerTips: [
      'Take an unequivocal position in sentence 1 ("I strongly advocate for Option A...").',
      'Dedicate Paragraph 2 to Reason 1 (efficiency/cost/experience), Paragraph 3 to Reason 2 (long-term sustainability/community).',
      'Concede Option B gracefully in Paragraph 4 ("While Option B undoubtedly offers X, it overlooks Y...").',
      'End with a concise 1-sentence synthesis recommendation.'
    ],
    templates: [
      {
        name: 'The 4-Paragraph Band 12 Survey Template',
        structure: [
          'Paragraph 1: Clear position + preview of overarching benefit (25 words)',
          'Paragraph 2: Primary argument with specific, concrete operational example (55 words)',
          'Paragraph 3: Secondary argument addressing long-term / community impact (55 words)',
          'Paragraph 4: Nuanced concession of the alternative + decisive concluding verdict (45 words)'
        ],
        phrases: [
          'Given the alternatives presented in the survey, I strongly endorse Option A.',
          'First and foremost, this approach directly addresses the growing demand for...',
          'Furthermore, from a long-term perspective, investing in X will foster greater...',
          'While I acknowledge that Option B has certain merits, such as..., it ultimately pales in comparison to the advantages of Option A.',
          'Taking all factors into consideration, Option A represents the most forward-thinking and practical path forward.'
        ]
      }
    ],
    phraseBank: [
      'far-reaching benefits',
      'cost-effective allocation of resources',
      'fosters a sense of community engagement',
      'yields tangible dividends',
      'uniquely positioned to address',
      'a pragmatic and sustainable choice'
    ],
    linkingWords: ['Primarily', 'In addition to this', 'Conversely', 'Admittedly', 'Ultimately']
  },

  // SPEAKING TASKS STRATEGY
  {
    id: 'speaking_overview',
    section: 'speaking',
    title: 'Speaking Mastery: Tasks 1-8 Execution & Time Exploitation',
    testedSkills: ['Full time utilization', 'Zero-silence pacing', 'Natural Canadian intonation', 'Vivid descriptive vocabulary'],
    timingPlan: 'Prep time: Plan 2 concrete bullet points + opening hook | Speaking time: Speak until 2-3 seconds remain on the countdown clock',
    trapPatterns: [
      'Stopping early with 15-20 seconds left on the clock (major penalty on fluency and task fulfillment)',
      'Excessive filler repetition ("like", "you know", "ummm")',
      'Monotone delivery without vocal variety or emphasis on key content words',
      'Describing only the center of the picture in Tasks 3 & 4 instead of spatial layout (foreground, background, left/right)'
    ],
    scoreMaximizerTips: [
      'Task 3 & 4 Formula: Set the scene (overall atmosphere/setting) -> Foreground details -> Background action -> Emotional demeanor -> Plausible predictions.',
      'Task 5 (Comparing & Persuading): Acknowledge your friend’s initial choice respectfully, then systematically contrast 2 key features (cost, convenience, durability) to win them over.',
      'Task 6 (Difficult Situation): Balance empathy with firm resolution. Never say "I can’t help you, bye." Apologize sincerely, explain the constraint, and offer 2 alternative compromises.',
      'Task 7 (Expressing Opinion): Structure like a mini-TED talk: Hook -> Stance -> Point 1 with personal/societal example -> Point 2 -> Rebuttal of counter-view -> Clincher conclusion.'
    ],
    templates: [
      {
        name: 'Task 3 & 4 Spatial Layout Anchor',
        structure: [
          '"This vibrant illustration depicts a bustling [setting, e.g., community farmer\'s market] on what appears to be a sunny weekend."',
          '"In the immediate foreground on the left-hand side, we can see..."',
          '"Moving toward the center of the image, there is an individual who appears to be..."',
          '"In the background, just behind the wooden stalls, a couple is..."',
          '"For Task 4: Looking at the person balancing the boxes, it seems highly probable that in the next few moments, they are going to..."'
        ],
        phrases: [
          'In the prominent foreground',
          'Situated adjacent to',
          'In the far upper-right corner',
          'It is reasonable to anticipate that',
          'Judged by their energetic demeanor'
        ]
      }
    ],
    phraseBank: [
      'weighing both possibilities carefully',
      'from my personal perspective',
      'an amicable middle ground',
      'would serve everyone’s best interest',
      'an unanticipated predicament'
    ],
    linkingWords: ['To kick things off', 'Another crucial factor to weigh', 'On the flip side', 'All things considered', 'Without a doubt']
  },

  // LISTENING STRATEGY
  {
    id: 'listening_strategy',
    section: 'listening',
    title: 'Listening Parts 1-6: One-Play Audio Defense & Trap Decoders',
    testedSkills: ['Active predictive listening', 'Note-taking keywords', 'Distinguishing speaker roles', 'Tone and attitude recognition'],
    timingPlan: 'Pre-audio: Read title/instructions instantly to anticipate context | Audio playing: Listen for pivots ("However", "Actually", "To be fair") | Question: Answer within 20s',
    trapPatterns: [
      'The "Echo Trap": Option uses the exact word spoken in audio, but in the wrong context or negated.',
      'The "Wrong Speaker Trap": Attributing a proposed suggestion to the person who actually rejected it.',
      'The "Initial Plan Trap": Speaker states Plan A, but at the end changes to Plan B due to a sudden obstacle.',
      'The "Extreme Trap": Distractor includes absolute words like "never", "only", "completely" that the speaker never claimed.'
    ],
    scoreMaximizerTips: [
      'Audio plays ONCE only. Never pause or daydream. Pay utmost attention to the final 10 seconds of each dialogue where resolutions occur.',
      'In Part 5 (Discussion with 3 speakers), mentally track who is the optimist, who is the skeptic/accountant, and who is the mediator.',
      'In Part 6 (Viewpoints), note down the author\'s main thesis vs the counter-arguments they cite from opponents.'
    ],
    phraseBank: ['the crux of the matter', 'take into account', 'pivot unexpectedly', 'shed light on', 'an alternative consensus'],
    linkingWords: ['Conversely', 'Nonetheless', 'In spite of that', 'On second thought', 'As a matter of fact']
  },

  // READING STRATEGY
  {
    id: 'reading_strategy',
    section: 'reading',
    title: 'Reading Parts 1-4: Split-Screen Speed & Evidence Scanning',
    testedSkills: ['Skimming for structure', 'Scanning for specific dates/terms', 'Diagram cross-referencing', 'Viewpoint attribution'],
    timingPlan: 'Part 1: 11 min | Part 2 (Diagram): 9 min | Part 3 (Info A-E): 10 min | Part 4 (Viewpoints): 12 min | Review: 5 min',
    trapPatterns: [
      'Part 2 Diagram traps: Reading asterisks, footnotes, and blackout dates incorrectly.',
      'Part 3 traps: Choosing "Paragraph B" because a word matches, when the statement is actually Not Mentioned (E) or in C.',
      'Part 4 traps: Confusing the journalist’s opinion with the opinions of the experts quoted in the article.'
    ],
    scoreMaximizerTips: [
      'For Part 1: Read the main email first (2 mins), answer questions 1-6, then read the response email and solve the drop-down cloze items directly in context.',
      'For Part 2: Look at the Diagram headings and footnote asterisks BEFORE reading the email. The email blanks usually test conditions like "students receive 15% discount except weekends".',
      'For Part 3 (Matching Paragraphs A, B, C, D, or E): If an idea cannot be directly substantiated by a sentence in A-D, mark E without hesitation. Do not force a match!'
    ],
    phraseBank: ['substantiated by the text', 'explicitly stipulated', 'subtle undercurrent', 'diametrically opposed', 'unsubstantiated conjecture'],
    linkingWords: ['Evidently', 'In contrast', 'Hence', 'Significantly', 'In accordance with']
  }
];

export const CORE_SRS_VOCABULARY = [
  {
    term: 'Pivotal',
    definition: 'Of crucial importance in relation to the development or success of something.',
    canadianCollocation: 'pivotal role in municipal transit',
    sampleSentence: 'The construction of the new SkyTrain line played a pivotal role in easing commuter gridlock.',
    difficultyBand: 10
  },
  {
    term: 'Expedite',
    definition: 'Make an action or process happen more quickly.',
    canadianCollocation: 'expedite the application process',
    sampleSentence: 'I would be grateful if building management could expedite the plumbing inspection to avert further leaks.',
    difficultyBand: 9
  },
  {
    term: 'Pragmatic',
    definition: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
    canadianCollocation: 'pragmatic compromise',
    sampleSentence: 'Adopting hybrid working policies proved to be a pragmatic compromise between management and employees.',
    difficultyBand: 11
  },
  {
    term: 'Substantiate',
    definition: 'Provide evidence to support or prove the truth of.',
    canadianCollocation: 'substantiate their claim',
    sampleSentence: 'The municipal auditor required documented receipts to substantiate the budget variance.',
    difficultyBand: 10
  },
  {
    term: 'Incongruous',
    definition: 'Not in harmony or keeping with the surroundings or other aspects of something.',
    canadianCollocation: 'strikingly incongruous feature',
    sampleSentence: 'The modern glass extension felt strikingly incongruous beside the historic 19th-century town hall.',
    difficultyBand: 12
  },
  {
    term: 'Ameliorate',
    definition: 'Make (something bad or unsatisfactory) better.',
    canadianCollocation: 'ameliorate traffic congestion',
    sampleSentence: 'Introducing dedicated bus lanes will significantly ameliorate peak-hour bottlenecks downtown.',
    difficultyBand: 11
  },
  {
    term: 'Detriment',
    definition: 'The state of being harmed or damaged.',
    canadianCollocation: 'to the detriment of local businesses',
    sampleSentence: 'Prolonging the road repaving project will operate to the detriment of local retail merchants.',
    difficultyBand: 10
  },
  {
    term: 'Equivocal',
    definition: 'Open to more than one interpretation; ambiguous or uncertain.',
    canadianCollocation: 'equivocal response from the council',
    sampleSentence: 'The strata representative gave an equivocal response when questioned regarding the upcoming maintenance levy.',
    difficultyBand: 12
  }
];
