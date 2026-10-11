/**
 * CELPIP Bank Item Schema & Test Types
 * Matching exact assessment requirements:
 * { id, test, skill, part, type, bandTarget, stem, passage?, audioFile?, transcript?, imageAsset?, options[], answer, explanation, trap, estSeconds }
 */

export type ExamTrack = 'general' | 'general_ls'; // Full (4 skills) vs LS (Listening + Speaking)
export type ExperienceMode = 'test_day' | 'practice'; // Strict vs Practice
export type BandTarget = 'CLB 4-6' | 'CLB 7-8' | 'CLB 9-10' | 'CLB 11-12';

export interface BankMultipleChoiceOption {
  id: string; // "A" | "B" | "C" | "D" | "E"
  text: string;
}

export interface BankQuestionItem {
  id: string;
  test: number; // 1-10
  skill: 'listening' | 'reading';
  part: number; // 1-6 for L, 1-4 for R
  type: string; // e.g. "Problem Solving", "Correspondence", "Diagram Application", etc.
  bandTarget: BandTarget;
  stem: string;
  passage?: string; // For Reading or passage-based items
  passageTitle?: string;
  diagramAsset?: {
    type: 'table' | 'map' | 'schedule' | 'floorplan';
    title: string;
    data: any;
  };
  audioFile?: string; // audio manifest identifier / URL
  transcript?: string; // Spoken audio transcript for listening
  imageAsset?: string; // SVG or image illustration asset
  options: BankMultipleChoiceOption[];
  answer: string; // Correct option ID ("A", "B", "C", "D", or "E")
  explanation: string; // Explicit evidence line quote
  trap: string; // Note explaining common trap / distractor mechanism
  estSeconds: number; // Recommended target pacing in seconds
}

export interface BankWritingItem {
  id: string;
  test: number;
  skill: 'writing';
  task: 1 | 2; // Task 1 (Email) | Task 2 (Survey)
  title: string;
  prompt: string;
  context: string;
  bulletPoints?: string[]; // 3 points for Task 1
  optionA?: { title: string; desc: string }; // For Task 2
  optionB?: { title: string; desc: string };
  constraints: {
    minWords: number;
    maxWords: number;
    timeMinutes: number;
    register: 'formal' | 'semi-formal' | 'informal' | 'persuasive';
  };
  sampleResponseBand9: string;
  sampleResponseBand11: string;
}

export interface BankSpeakingItem {
  id: string;
  test: number;
  skill: 'speaking';
  task: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  title: string;
  prompt: string;
  situation: string;
  prepSeconds: number;
  speakSeconds: number;
  imageAsset?: {
    id: string;
    title: string;
    description: string;
    svgContent: string; // Descriptive SVG illustration
  };
  comparisonOptions?: {
    option1: { title: string; details: string[] };
    option2: { title: string; details: string[] };
  };
  guidancePoints?: string[];
  sampleResponseBand9: string;
  sampleResponseBand11: string;
}

export interface FullBankTest {
  testNumber: number;
  title: string;
  theme: string;
  listening: BankQuestionItem[]; // Exactly 38 questions
  reading: BankQuestionItem[];    // Exactly 38 questions
  writing: BankWritingItem[];     // Exactly 2 prompts
  speaking: BankSpeakingItem[];   // Exactly 8 prompts
}
