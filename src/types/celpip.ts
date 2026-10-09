/**
 * CELPIP Master 12 - Assessment Data Model & Types
 * Faithful to official CELPIP-General specifications and CLB criteria.
 */

export type SkillComponent = 'listening' | 'reading' | 'writing' | 'speaking';

export type DifficultyLevel =
  | 'foundation'   // CELPIP 5-6
  | 'standard'     // CELPIP 7-8
  | 'advanced'     // CELPIP 9-10
  | 'elite'        // CELPIP 11-12
  | 'beyond_exam'; // Stress mode

export type TestMode =
  | 'full_mock'
  | 'section_mock'
  | 'drill'
  | 'weak_spot'
  | 'sprint';

export type ExamDeliveryMode = 'exam' | 'practice';

export interface MultipleChoiceOption {
  id: string; // e.g. "A", "B", "C", "D" or "E"
  text: string;
  isCorrect: boolean;
  rationale: string; // Why this option is right or why it is a distractor
  trapType?: 'partial_truth' | 'wrong_speaker' | 'reversed_cause' | 'scope_error' | 'extreme_generalization';
}

export interface QuestionItem {
  id: string;
  partId: string;
  skill: SkillComponent;
  questionNumber: number;
  promptText: string;
  options: MultipleChoiceOption[];
  correctOptionId: string;
  skillTag: 'main_idea' | 'detail' | 'inference' | 'tone_attitude' | 'vocabulary_in_context' | 'viewpoint_synthesis';
  evidenceText?: string; // Sentence in audio transcript or reading passage proving the answer
  timeAllowedSeconds?: number;
}

export interface SpeakerTurn {
  speaker: string; // e.g. "Speaker 1", "Dave (Manager)", "Receptionist"
  text: string;
  voiceGender?: 'male' | 'female';
  tone?: string;
}

export interface ListeningPartData {
  partId: string;
  partNumber: number; // 0 for Practice, 1-6 for Parts
  title: string;
  instructions: string;
  audioScript: SpeakerTurn[];
  fullTranscript: string;
  audioDurationSeconds?: number;
  preparationSeconds?: number;
  questions: QuestionItem[];
  speakerCount: number;
  imagePromptUrl?: string; // Optional image (Part 5 discussion scene)
}

export interface DiagramData {
  title: string;
  subtitle?: string;
  columns?: string[];
  rows?: { label: string; cells: string[] }[];
  bulletPoints?: string[];
  footerNote?: string;
}

export interface ReadingPartData {
  partId: string;
  partNumber: number; // 1-4
  title: string;
  instructions: string;
  passageTitle: string;
  passageText: string; // Left pane text (or formatted HTML/paragraphs)
  diagram?: DiagramData; // For Part 2
  responseEmailTemplate?: string; // For Part 1 response email with dropdown blanks
  articleAuthor?: string;
  questions: QuestionItem[];
  suggestedTimeMinutes: number;
}

export interface WritingTaskData {
  taskId: string;
  taskNumber: 1 | 2;
  title: string;
  instructions: string;
  promptContext: string;
  bulletPoints?: string[]; // 3 required points for Task 1
  optionA?: { title: string; description: string }; // For Task 2
  optionB?: { title: string; description: string };
  recommendedWordRange: { min: number; max: number }; // 150-200
  timeAllowedMinutes: number; // 27 for Task 1, 26 for Task 2
}

export interface SpeakingTaskData {
  taskId: string;
  taskNumber: number; // 0 for Practice, 1-8 for Tasks
  title: string;
  instructions: string;
  situation: string;
  preparationSeconds: number; // 30s or 60s
  speakingSeconds: number;     // 60s or 90s
  imagePrompt?: {
    type: 'scene' | 'predictions' | 'comparison' | 'unusual';
    url: string;
    alt: string;
    description: string;
  };
  comparisonOptions?: {
    option1: { title: string; details: string[] };
    option2: { title: string; details: string[] };
  };
  guidanceQuestions?: string[];
}

export interface SimulationPackage {
  id: string;
  title: string;
  topicDomain: string; // e.g. "Municipal Bylaws & Transit", "Workplace Innovation"
  difficultyLevel: DifficultyLevel;
  hash: string;
  createdAt: string;
  listeningParts: ListeningPartData[];
  readingParts: ReadingPartData[];
  writingTasks: WritingTaskData[];
  speakingTasks: SpeakingTaskData[];
}

export interface SentenceAnnotation {
  originalSentence: string;
  correctedSentence: string;
  category: 'Grammar' | 'Vocabulary & Collocation' | 'Register' | 'Cohesion';
  explanation: string;
}

export interface WritingGradingResult {
  overallBand: number; // 1-12
  clbLevel: number;
  confidenceRating: string;
  wordCount: number;
  wordCountStatus: 'Optimal (150-200 range)' | 'Slightly Short' | 'Too Short' | 'Over Limit';
  registerAnalysis: string;
  criteriaScores: {
    contentAndCoherence: { band: number; feedback: string };
    vocabulary: { band: number; feedback: string };
    readabilityAndGrammar: { band: number; feedback: string };
    taskFulfillment: { band: number; feedback: string };
  };
  sentenceAnnotations: SentenceAnnotation[];
  band12ModelAnswer: string;
  levelUpVersion: string;
}

export interface SpeakingGradingResult {
  overallBand: number; // 1-12
  clbLevel: number;
  confidenceRating: string;
  transcript: string;
  timeManagement: {
    speakingDurationSeconds: number;
    targetDurationSeconds: number;
    efficiencyRating: string;
    feedback: string;
  };
  fillerAnalysis: {
    totalFillerCount: number;
    fillersDetected: string[];
    fillersPerMinute: number;
    impactLevel: string;
  };
  criteriaScores: {
    contentAndCoherence: { band: number; feedback: string };
    vocabularyRange: { band: number; feedback: string };
    fluencyAndPace: { band: number; feedback: string };
    grammarAndSyntax: { band: number; feedback: string };
    taskFulfillment: { band: number; feedback: string };
  };
  band12ModelResponse: string;
  keyTakeaways: string[];
}

export interface SectionScoreSummary {
  skill: SkillComponent;
  rawScore?: number;
  totalQuestions?: number;
  estimatedCelpipBand: number;
  clbLevel: number;
  timeSpentSeconds: number;
  accuracyPercentage?: number;
  partBreakdown?: { [partId: string]: { correct: number; total: number } };
  tagBreakdown?: { [tag: string]: { correct: number; total: number } };
}

export interface TestAttemptRecord {
  id: string;
  simulationId: string;
  simulationTitle: string;
  date: string;
  deliveryMode: ExamDeliveryMode;
  testMode: TestMode;
  startingDifficulty: DifficultyLevel;
  finalDifficulty: DifficultyLevel;
  overallCelpipBand: number;
  overallClbLevel: number;
  listeningScore?: SectionScoreSummary;
  readingScore?: SectionScoreSummary;
  writingScore?: {
    task1?: WritingGradingResult;
    task2?: WritingGradingResult;
    overallBand: number;
    clbLevel: number;
  };
  speakingScore?: {
    tasks?: { [taskId: string]: SpeakingGradingResult };
    overallBand: number;
    clbLevel: number;
  };
  userAnswers: {
    listening?: { [questionId: string]: string };
    reading?: { [questionId: string]: string };
    writing?: { [taskId: string]: string };
    speakingTranscripts?: { [taskId: string]: string };
    speakingAudioBlobs?: { [taskId: string]: string }; // Base64 or object URL
  };
  completed: boolean;
}

export interface UserTargetProfile {
  targetClbLevel: number; // e.g. 9 or 12
  examDate?: string;
  targetPurpose: 'Express Entry (Immigration)' | 'Canadian Citizenship' | 'Professional Licensing' | 'Academic / Personal Mastery';
  currentEstimatedLevels: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
}

export interface SrsVocabularyItem {
  id: string;
  term: string;
  definition: string;
  canadianCollocation: string;
  sampleSentence: string;
  sourceContext: string;
  difficultyBand: number;
  easeFactor: number;
  intervalDays: number;
  repetitionCount: number;
  nextReviewDate: string; // ISO date
}
