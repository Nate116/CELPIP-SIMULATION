# CELPIP Writing Dual-Pass AI Grader Rubric & Prompt

## 1. Dual-Pass Reconciliation Protocol
To reduce grading variance, the evaluation pipeline executes two independent evaluation passes:
- **Pass 1 (Diagnostic & Analytic Pass)**: Analyzes sentence syntax, grammatical accuracy, collocation naturalness, cohesion markers, and task fulfillment.
- **Pass 2 (Holistic & Band Calibration Pass)**: Evaluates overall communicative effectiveness against Canadian Language Benchmark (CLB) Band 1-12 criteria.
- **Reconciliation Engine**: Calculates weighted criterion scores, checks variance (if variance > 1.0 band, flag and arbitrate via weighted consensus), and compiles detailed sentence-level recommendations.

## 2. Four CELPIP Criteria Breakdown

### Criterion 1: Content & Coherence (25%)
- Relevance to the prompt and completeness of response.
- Paragraph logic, idea progression, and topical development.
- Discourse markers and transitions (*consequently, notwithstanding, in light of this*).

### Criterion 2: Vocabulary (25%)
- Lexical range, precision, and sophistication (*e.g., instead of "good idea", "a commendable initiative"*).
- Idiomatic and collocation naturalness (*take into consideration, substantial investment, mutually beneficial*).
- Absence of repetition and improper word forms.

### Criterion 3: Readability & Grammar (25%)
- Syntactic variety: complex, compound, and conditional structures.
- Grammatical accuracy: subject-verb agreement, tense consistency, modal verbs, prepositions.
- Punctuation, capitalization, and sentence boundary management.

### Criterion 4: Task Fulfillment (25%)
- Word count compliance (Target: 150 - 200 words). Penalty applied if below 130 or exceeding 230 words.
- Tone and register appropriateness (formal for municipal officials/strata managers; semi-formal for colleagues; informal for friends).
- Addressing all prompt bullets (Task 1) or contrasting survey options (Task 2).

## 3. CELPIP Band Level Mapping (CLB Equivalent)
- **CELPIP 11-12 (CLB 11-12) - Advanced / Elite**: Flawless control of tone, rich idiomatic Canadian vocabulary, sophisticated sentence structures, compelling and nuanced arguments, effortless cohesion.
- **CELPIP 9-10 (CLB 9-10) - Highly Effective**: Broad vocabulary, varied syntactic structures, clear organization, minor slips that never impede comprehension.
- **CELPIP 7-8 (CLB 7-8) - Adequate / Competent**: Meets all requirements, clear meaning, moderate vocabulary, occasional awkward phrasings or minor grammatical errors.
- **CELPIP 5-6 (CLB 5-6) - Developing**: Basic expression, noticeable errors in grammar/spelling, repetitive vocabulary, limited sentence variety.
- **CELPIP M / 1-4**: Minimal proficiency or failure to satisfy prompt constraints.

## 4. Required JSON Output Structure
```json
{
  "overall_celpip_band": 10,
  "clb_level": 10,
  "confidence_rating": "High (94%)",
  "word_count_analyzed": 182,
  "word_count_status": "Optimal (150-200 range)",
  "register_analysis": "Appropriate formal tone maintained throughout",
  "criteria_scores": {
    "content_and_coherence": { "band": 10, "feedback": "Clear progression with well-developed ideas." },
    "vocabulary": { "band": 9, "feedback": "Strong lexical variety; replace 'make better' with 'ameliorate' or 'enhance'." },
    "readability_and_grammar": { "band": 10, "feedback": "Good use of complex sentence structures and zero comma splices." },
    "task_fulfillment": { "band": 11, "feedback": "Every bullet point thoroughly addressed with practical details." }
  },
  "sentence_annotations": [
    {
      "original_sentence": "I am writing this email for telling you about the noise.",
      "corrected_sentence": "I am writing this letter to bring to your attention an ongoing noise concern.",
      "category": "Register & Collocation",
      "explanation": "'Bring to your attention' establishes professional decorum suitable for strata management."
    }
  ],
  "band_12_model_answer": "...",
  "level_up_version": "..."
}
```
