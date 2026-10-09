# CELPIP Question Validation & Psychometric Audit Engine

## Validation Objective
Before any generated question item or simulation is admitted into the test bank or presented to a test-taker, it must undergo automated psychometric validation to enforce absolute answer unambiguity, strict blueprint fidelity, and CELPIP-style consistency.

## Automated Validation Checklist

```
PASS / FAIL CRITERIA
[ ] Exactly 1 unequivocally correct answer exists.
[ ] All 3 distractors are demonstrably false or unsupportable from the source text/audio.
[ ] None of the distractors can be argued as technically valid via alternative reasonable interpretation.
[ ] The correct answer is NOT identifiable simply by being longer, more detailed, or using identical wording ("stem cueing").
[ ] Word counts and lexical densities strictly match target difficulty band.
[ ] No culturally biased, politically volatile, or exclusionary subject matter.
[ ] Reading Part 3 follows the exact 5-option schema: A, B, C, D, or E (Not Mentioned).
[ ] Writing prompts contain exactly 3 required bullet points (Task 1) or 2 clear survey choices (Task 2).
[ ] Speaking tasks include precise time parameters (prep time, response time) and target communicative goal.
```

## JSON Output Schema for Validator Prompt

```json
{
  "validation_passed": true,
  "confidence_score": 0.98,
  "metrics": {
    "key_unambiguity": 10,
    "distractor_plausibility": 9,
    "canadian_context_authenticity": 10,
    "stem_cue_absence": 10
  },
  "identified_flaws": [],
  "remediation_action": "ACCEPT"
}
```

If `validation_passed` is false, the item is automatically sent to the Revision Loop with specific flags (e.g., "Distractor C is plausible under condition X; replace with clear scope-limitation trap").
