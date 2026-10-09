/**
 * CELPIP Official Scoring Matrices & CLB Alignment Engine
 */

export interface BandDescriptor {
  band: number;
  clb: number;
  title: string;
  summary: string;
  immigrationUtility: string;
}

export const CELPIP_BAND_DESCRIPTORS: Record<number, BandDescriptor> = {
  12: {
    band: 12,
    clb: 12,
    title: 'Advanced Proficiency in Workplace & Community Contexts',
    summary: 'Candidate communicates with effortless fluency, masterful precision, and full command of idioms and nuance in all demanding situations.',
    immigrationUtility: 'Max CRS Express Entry points + Elite professional accreditation.'
  },
  11: {
    band: 11,
    clb: 11,
    title: 'Advanced Proficiency in Workplace & Community Contexts',
    summary: 'Candidate demonstrates extensive vocabulary, complex syntax, and flawless cultural register adaptation across complex scenarios.',
    immigrationUtility: 'Max CRS Express Entry points.'
  },
  10: {
    band: 10,
    clb: 10,
    title: 'Highly Effective Proficiency',
    summary: 'Candidate readily understands and conveys complex viewpoints, handles idiomatic expressions naturally, and synthesizes subtle subtext.',
    immigrationUtility: 'Full CRS points in language category.'
  },
  9: {
    band: 9,
    clb: 9,
    title: 'Effective Operational Proficiency',
    summary: 'Candidate performs effectively in demanding professional and civic situations. Minor errors do not obscure meaning. "Golden Threshold" for Express Entry.',
    immigrationUtility: 'Crucial CLB 9 threshold for maximum skill transferability points.'
  },
  8: {
    band: 8,
    clb: 8,
    title: 'Good Operational Proficiency',
    summary: 'Candidate demonstrates good grasp of Canadian communication, with occasional difficulty in rapid speech or subtle irony.',
    immigrationUtility: 'Sufficient for Provincial Nominee Programs (PNP).'
  },
  7: {
    band: 7,
    clb: 7,
    title: 'Adequate Operational Proficiency',
    summary: 'Candidate communicates comfortably in routine familiar situations. Understands main points and key facts.',
    immigrationUtility: 'Minimum threshold for Canadian Citizenship & Federal Skilled Trades.'
  },
  6: {
    band: 6,
    clb: 6,
    title: 'Developing Proficiency',
    summary: 'Candidate understands straightforward informational texts and instructions but struggles with complex viewpoints.',
    immigrationUtility: 'Entry-level work programs.'
  },
  5: {
    band: 5,
    clb: 5,
    title: 'Acquiring Proficiency',
    summary: 'Candidate manages predictable day-to-day interactions. Limited lexical range and grammatical flexibility.',
    immigrationUtility: 'Semi-skilled immigration streams.'
  },
  4: {
    band: 4,
    clb: 4,
    title: 'Basic Proficiency',
    summary: 'Candidate requires substantial support and simple phrasing.',
    immigrationUtility: 'Minimum baseline.'
  }
};

/**
 * Listening Raw Score (out of 38) to CELPIP Band (1-12)
 * Based on psychometric equating and official score distribution bands.
 */
export function convertListeningRawScore(rawScore: number): { band: number; clb: number; confidence: string } {
  const score = Math.max(0, Math.min(38, Math.round(rawScore)));

  if (score >= 37) return { band: 12, clb: 12, confidence: 'High (±0.4)' };
  if (score >= 35) return { band: 11, clb: 11, confidence: 'High (±0.5)' };
  if (score >= 33) return { band: 10, clb: 10, confidence: 'High (±0.5)' };
  if (score >= 30) return { band: 9,  clb: 9,  confidence: 'High (±0.6)' };
  if (score >= 26) return { band: 8,  clb: 8,  confidence: 'Moderate (±0.6)' };
  if (score >= 22) return { band: 7,  clb: 7,  confidence: 'Moderate (±0.7)' };
  if (score >= 17) return { band: 6,  clb: 6,  confidence: 'Moderate (±0.7)' };
  if (score >= 12) return { band: 5,  clb: 5,  confidence: 'Moderate (±0.8)' };
  if (score >= 8)  return { band: 4,  clb: 4,  confidence: 'Lower (±0.9)' };
  return { band: 3, clb: 3, confidence: 'Lower' };
}

/**
 * Reading Raw Score (out of 38) to CELPIP Band (1-12)
 */
export function convertReadingRawScore(rawScore: number): { band: number; clb: number; confidence: string } {
  const score = Math.max(0, Math.min(38, Math.round(rawScore)));

  if (score >= 37) return { band: 12, clb: 12, confidence: 'High (±0.4)' };
  if (score >= 35) return { band: 11, clb: 11, confidence: 'High (±0.5)' };
  if (score >= 33) return { band: 10, clb: 10, confidence: 'High (±0.5)' };
  if (score >= 30) return { band: 9,  clb: 9,  confidence: 'High (±0.6)' };
  if (score >= 26) return { band: 8,  clb: 8,  confidence: 'Moderate (±0.6)' };
  if (score >= 22) return { band: 7,  clb: 7,  confidence: 'Moderate (±0.7)' };
  if (score >= 17) return { band: 6,  clb: 6,  confidence: 'Moderate (±0.7)' };
  if (score >= 12) return { band: 5,  clb: 5,  confidence: 'Moderate (±0.8)' };
  if (score >= 8)  return { band: 4,  clb: 4,  confidence: 'Lower (±0.9)' };
  return { band: 3, clb: 3, confidence: 'Lower' };
}
