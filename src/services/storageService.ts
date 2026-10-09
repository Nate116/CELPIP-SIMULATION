/**
 * LocalStorage & Offline Persistence Service
 * Handles test attempts, user targets, seen-item deduplication ledger, and SRS vocabulary.
 */

import { TestAttemptRecord, UserTargetProfile, SrsVocabularyItem, SimulationPackage, DifficultyLevel } from '../types/celpip';
import { SAMPLE_SIMULATIONS } from '../data/sampleSimulations';
import { CORE_SRS_VOCABULARY } from '../data/strategyCards';

const STORAGE_KEYS = {
  USER_PROFILE: 'celpip_user_profile',
  ATTEMPTS: 'celpip_attempts',
  SEEN_LEDGER: 'celpip_seen_ledger',
  SRS_VOCAB: 'celpip_srs_vocab',
  SIMULATION_BANK: 'celpip_simulation_bank',
  CURRENT_DIFFICULTY: 'celpip_current_difficulty',
  AUDIO_VOLUME: 'celpip_audio_volume'
};

export const storageService = {
  // USER PROFILE
  getUserProfile(): UserTargetProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading profile', e);
    }
    const defaultProfile: UserTargetProfile = {
      targetClbLevel: 10,
      targetPurpose: 'Express Entry (Immigration)',
      examDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currentEstimatedLevels: {
        listening: 9,
        reading: 9,
        writing: 8,
        speaking: 8
      }
    };
    this.saveUserProfile(defaultProfile);
    return defaultProfile;
  },

  saveUserProfile(profile: UserTargetProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  // ATTEMPTS HISTORY
  getAttempts(): TestAttemptRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveAttempt(attempt: TestAttemptRecord): void {
    const attempts = this.getAttempts();
    const existingIndex = attempts.findIndex(a => a.id === attempt.id);
    if (existingIndex >= 0) {
      attempts[existingIndex] = attempt;
    } else {
      attempts.unshift(attempt);
    }
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

    // Update Seen Ledger
    this.recordSeenItems(attempt);

    // Update User Profile Radar
    this.updateProfileRadarFromAttempt(attempt);
  },

  // SEEN LEDGER FOR DEDUPLICATION
  getSeenItemHashes(): Set<string> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEEN_LEDGER);
      return data ? new Set(JSON.parse(data)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  },

  recordSeenItems(attempt: TestAttemptRecord): void {
    const seen = this.getSeenItemHashes();
    seen.add(attempt.simulationId);
    if (attempt.userAnswers.listening) {
      Object.keys(attempt.userAnswers.listening).forEach(qId => seen.add(qId));
    }
    if (attempt.userAnswers.reading) {
      Object.keys(attempt.userAnswers.reading).forEach(qId => seen.add(qId));
    }
    localStorage.setItem(STORAGE_KEYS.SEEN_LEDGER, JSON.stringify(Array.from(seen)));
  },

  // SIMULATIONS BANK
  getAllSimulations(): SimulationPackage[] {
    try {
      const customBank = localStorage.getItem(STORAGE_KEYS.SIMULATION_BANK);
      if (customBank) {
        const parsed = JSON.parse(customBank);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom with default sample bank
          const customIds = new Set(parsed.map((s: SimulationPackage) => s.id));
          const missingDefaults = SAMPLE_SIMULATIONS.filter(s => !customIds.has(s.id));
          return [...parsed, ...missingDefaults];
        }
      }
    } catch (e) {
      console.error('Error reading simulation bank', e);
    }
    return SAMPLE_SIMULATIONS;
  },

  saveCustomSimulation(sim: SimulationPackage): void {
    const sims = this.getAllSimulations();
    const existingIdx = sims.findIndex(s => s.id === sim.id);
    if (existingIdx >= 0) {
      sims[existingIdx] = sim;
    } else {
      sims.unshift(sim);
    }
    localStorage.setItem(STORAGE_KEYS.SIMULATION_BANK, JSON.stringify(sims));
  },

  getNextUnseenSimulation(userDifficulty?: DifficultyLevel): SimulationPackage {
    const seen = this.getSeenItemHashes();
    const all = this.getAllSimulations();
    // Prioritize unseen simulations matching target difficulty or standard
    const unseen = all.filter(s => !seen.has(s.id));
    if (unseen.length > 0) {
      if (userDifficulty) {
        const matched = unseen.find(s => s.difficultyLevel === userDifficulty);
        if (matched) return matched;
      }
      return unseen[0];
    }
    // If all seen, pick the least recently attempted or random from bank
    return all[Math.floor(Math.random() * all.length)];
  },

  // SRS VOCABULARY
  getSrsVocab(): SrsVocabularyItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SRS_VOCAB);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading SRS vocab', e);
    }

    // Seed default Canadian high-band collocations
    const seeded: SrsVocabularyItem[] = CORE_SRS_VOCABULARY.map((v, i) => ({
      id: `srs_seed_${i}`,
      term: v.term,
      definition: v.definition,
      canadianCollocation: v.canadianCollocation,
      sampleSentence: v.sampleSentence,
      sourceContext: 'CELPIP Elite Band 11-12 Collocation Lexicon',
      difficultyBand: v.difficultyBand,
      easeFactor: 2.5,
      intervalDays: 1,
      repetitionCount: 0,
      nextReviewDate: new Date().toISOString()
    }));
    this.saveSrsVocab(seeded);
    return seeded;
  },

  saveSrsVocab(items: SrsVocabularyItem[]): void {
    localStorage.setItem(STORAGE_KEYS.SRS_VOCAB, JSON.stringify(items));
  },

  recordSrsReview(itemId: string, grade: 1 | 2 | 3 | 4 | 5): void {
    const items = this.getSrsVocab();
    const idx = items.findIndex(i => i.id === itemId);
    if (idx === -1) return;

    const item = items[idx];
    // SM-2 Spaced Repetition Algorithm
    if (grade >= 3) {
      if (item.repetitionCount === 0) {
        item.intervalDays = 1;
      } else if (item.repetitionCount === 1) {
        item.intervalDays = 6;
      } else {
        item.intervalDays = Math.round(item.intervalDays * item.easeFactor);
      }
      item.repetitionCount += 1;
    } else {
      item.repetitionCount = 0;
      item.intervalDays = 1;
    }

    // Update ease factor: EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
    item.easeFactor = Math.max(1.3, item.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + item.intervalDays);
    item.nextReviewDate = nextDate.toISOString();

    items[idx] = item;
    this.saveSrsVocab(items);
  },

  addVocabularyMistake(term: string, definition: string, contextSentence: string): void {
    const items = this.getSrsVocab();
    if (items.some(i => i.term.toLowerCase() === term.toLowerCase())) return;

    const newItem: SrsVocabularyItem = {
      id: `srs_err_${Date.now()}`,
      term,
      definition,
      canadianCollocation: `key usage: ${term}`,
      sampleSentence: contextSentence,
      sourceContext: 'Added from writing/reading assessment review',
      difficultyBand: 10,
      easeFactor: 2.3,
      intervalDays: 1,
      repetitionCount: 0,
      nextReviewDate: new Date().toISOString()
    };
    items.unshift(newItem);
    this.saveSrsVocab(items);
  },

  // HELPER
  updateProfileRadarFromAttempt(attempt: TestAttemptRecord): void {
    const profile = this.getUserProfile();
    if (attempt.listeningScore?.estimatedCelpipBand) {
      profile.currentEstimatedLevels.listening = attempt.listeningScore.estimatedCelpipBand;
    }
    if (attempt.readingScore?.estimatedCelpipBand) {
      profile.currentEstimatedLevels.reading = attempt.readingScore.estimatedCelpipBand;
    }
    if (attempt.writingScore?.overallBand) {
      profile.currentEstimatedLevels.writing = attempt.writingScore.overallBand;
    }
    if (attempt.speakingScore?.overallBand) {
      profile.currentEstimatedLevels.speaking = attempt.speakingScore.overallBand;
    }
    this.saveUserProfile(profile);
  }
};
