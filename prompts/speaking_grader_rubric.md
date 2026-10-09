# CELPIP Speaking AI Grader Rubric & Transcription Analysis

## 1. Multi-Dimensional Assessment Criteria
The speaking assessment engine reviews speech audio transcripts and timing analytics across five dimensions:

### 1. Content & Coherence (25%)
- Immediate addressing of the scenario context.
- Logical organization: opening hook/greeting, body reasons with concrete real-life examples, cohesive transition markers, and wrap-up conclusion.
- Specificity vs generic vagueness.

### 2. Lexical Resource & Vocabulary Range (20%)
- Sophisticated idiomatic phrases and Canadian collocations (*e.g., "cost-effective alternative", "weigh the pros and cons", "congested transit corridors"*).
- Precision of adjectives, verbs, and adverbs.

### 3. Fluency & Time Management (25%)
- Utilization of allocated speaking window (e.g. 50-60s in a 60s task, or 75-88s in a 90s task).
- Filler frequency (um, uh, like, you know, actually, basically).
- Flow continuity and natural cadence without disruptive mid-sentence halts.

### 4. Grammar & Syntactic Control (15%)
- Variety of clauses: relative clauses, conditionals (If X happens, Y would...), modal hedging (*might consider, would be prudent to*).
- Accuracy of verb tenses, especially past continuous / past perfect in Task 2 narratives.

### 5. Task Fulfillment & Register Adaptation (15%)
- Correct tone according to prompt (sympathetic friend in Task 1, professional colleague in Task 6, persuasive advocate in Task 5 & 7).
- Full adherence to constraints (e.g., describing location/spatial layout in Task 3, making plausible predictions in Task 4).

## 2. JSON Evaluation Response Format
```json
{
  "overall_celpip_band": 9,
  "clb_level": 9,
  "confidence_rating": "High (92%)",
  "time_management": {
    "speaking_duration_seconds": 54,
    "target_duration_seconds": 60,
    "efficiency_rating": "Optimal (90% time utilized)",
    "feedback": "Pacing was well distributed; finished conclusion smoothly before the buzzer."
  },
  "filler_analysis": {
    "total_filler_count": 3,
    "fillers_detected": ["um", "like", "uh"],
    "fillers_per_minute": 3.3,
    "impact_level": "Minimal - within acceptable Band 9-10 threshold"
  },
  "criteria_scores": {
    "content_and_coherence": { "band": 10, "feedback": "Well-structured advice with clear practical steps." },
    "vocabulary_range": { "band": 9, "feedback": "Strong vocabulary with idioms like 'take it with a grain of salt'." },
    "fluency_and_pace": { "band": 9, "feedback": "Steady rhythm with only two brief pauses." },
    "grammar_and_syntax": { "band": 9, "feedback": "Accurate past and conditional tense usage." },
    "task_fulfillment": { "band": 10, "feedback": "Directly resolved both conflicting factors in prompt." }
  },
  "band_12_model_response": "...",
  "key_takeaways_for_improvement": [
    "Replace conversational filler 'like' with deliberate pauses or transition words such as 'specifically' or 'more importantly'."
  ]
}
```
