# CELPIP Master 12 - Elite Exam Simulator & AI Coach

A full-stack, adaptive CELPIP-General examination simulation web app (installable PWA, mobile-friendly, works offline and on low bandwidth) designed to train candidates to reach the top band (**CELPIP 11–12 / CLB 11–12**) across all four abilities: Listening, Reading, Writing, and Speaking.

---

## 🌟 Key Capabilities & Architectural Highlights

1. **Zero Repetition & Deduplication Engine**
   - Automatically tracks every question, passage, prompt, and simulation in a persistent seen-item ledger.
   - Built-in bank of **10 complete, authentic Canadian simulations** spanning diverse municipal, workplace, environmental, transit, strata, health, and civic domains (Vancouver, Calgary, Toronto, Montreal, Ottawa, Halifax, Edmonton, Victoria, Winnipeg, Kelowna).

2. **Exam Fidelity (CELPIP-General Specifications)**
   - **Listening (Parts 1–6 + Practice)**:
     - Unscored Practice Item
     - Part 1: Listening to Problem Solving (8 items)
     - Part 2: Listening to a Daily Life Conversation (5 items)
     - Part 3: Listening for Information (6 items)
     - Part 4: Listening to a News Item (5 items)
     - Part 5: Listening to a Discussion with 3 speakers (8 items)
     - Part 6: Listening for Viewpoints (6 items)
     - Audio plays **ONCE only** in strict Exam Mode (with practice replay mode available). Multi-speaker dialogue synthesis with authentic Canadian speech cadences.
   - **Reading (Parts 1–4)**:
     - Split-screen layout (passage on left, questions on right).
     - Part 1: Reading Correspondence (11 items: email + cloze response email).
     - Part 2: Reading to Apply a Diagram (8 items: multi-column diagram + email application).
     - Part 3: Reading for Information (9 items matching Paragraphs A, B, C, D, or E: Not Mentioned).
     - Part 4: Reading for Viewpoints (10 items: editorial + reader response commentary).
   - **Writing (Tasks 1 & 2)**:
     - Task 1: Writing an Email (150–200 words, 27 min, 3 mandatory bullets).
     - Task 2: Responding to Survey Questions (150–200 words, 26 min, Option A vs Option B).
     - Live word counter with optimal-range color feedback, individual task countdown clocks, and exam mode (spellcheck disabled).
     - **Dual-Pass AI Grader** powered by Gemini (`gemini-3.8-flash`) assessing Content, Vocabulary, Grammar, and Task Fulfillment, generating sentence-level corrections, level-up suggestions, and Band-12 model answers.
   - **Speaking (Tasks 1–8 + Practice)**:
     - Preparation countdown (30s / 60s) followed by official **950Hz beep audio cue**.
     - Speaking countdown (60s / 90s) with live **Web Audio API waveform visualizer**.
     - Image prompts for Tasks 3, 4, 5, and 8.
     - Acoustic & fluency AI evaluation: duration analysis, filler word frequency (um, uh, like), criteria scores, and Band-12 model responses.

3. **Adaptive Difficulty Dial**
   - Foundation (CELPIP 5–6), Standard (7–8), Advanced (9–10), Elite (11–12), Beyond-Exam (stress mode with dense lexical load and subtle traps).

4. **Spaced Repetition (SRS) Vocabulary Trainer**
   - High-yield Canadian collocations based on SM-2 algorithm.
   - Auto-captures user writing and speaking errors into flashcards.

5. **Official Printable PDF Score Report**
   - Produces official-style printable score certificate with CLB benchmark mappings, Express Entry CRS qualification matrix, and psychometric authentication stamp.

---

## 📁 Repository Structure & Prompt Templates

- `prompts/question_generator_blueprint.md`: Master generation blueprint & psychometric schemas.
- `prompts/question_validator.md`: Pass/fail audit checklist for key unambiguity and trap plausibility.
- `prompts/writing_grader_rubric.md`: Dual-pass reconciliation rubric for CELPIP Writing.
- `prompts/speaking_grader_rubric.md`: Transcription & fluency rubric for CELPIP Speaking.
- `prompts/calibration_report.md`: Benchmark exemplar comparisons and raw-to-scaled score conversion tables.
- `src/types/celpip.ts`: Core data structures and TypeScript interfaces.
- `src/data/sampleSimulations.ts`: 10 comprehensive simulations bank.
- `src/data/strategyCards.ts`: Strategy cards, templates, and score-maximizer tips.
- `src/data/scoringRubrics.ts`: Raw-to-CELPIP-scale conversion algorithms.
- `server.ts`: Express full-stack proxy integrating `@google/genai` (writing grading, speaking evaluation, audio transcription, and TTS).

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development full-stack server (Port 3000)
npm run dev

# Run TypeScript check
npm run lint

# Compile production build
npm run build
```
