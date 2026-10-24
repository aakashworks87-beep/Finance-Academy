export interface LevelScore {
  score: number;
  total: number;
  passed: boolean;
  completedAt?: string;
}

export interface CourseProgress {
  passedLevels: number[];
  levelScores: Record<number, LevelScore>;
  finalExamPassed: boolean;
  finalExamScore: { score: number; total: number; percentage: number } | null;
  certificateClaimed: boolean;
  recipientName: string;
  certificateId: string;
  certificateQuote: string;
  certificateDate: string;
}

const STORAGE_KEY = 'fa_course_progress_v2';

export const SKIP_ROAST_MESSAGES = [
  'Wow, skipping all 7 levels to grab a certificate? That is not a shortcut, that is a speedrun to embarrassment.',
  'Certificate chahiye, mehnat nahi? Even the certificate is shy to be claimed like this.',
  'You skipped the learning and came straight for the prize. Bold strategy. Zero marks for it.',
  'Arre topper, the levels are that way. The certificate is not a drive-through.',
  'Skipping levels to reach the certificate is like buying a medal without running the race. Everyone can see it, especially you.',
  'Nice try, Flash. The course is 7 levels, not 7 seconds.',
];

export const COPY_GUARD_MESSAGES = [
  'Dont you think you can do this without seeing? How not clever of you.',
  'Arre, the answer is in your head, not in the module. Trust yourself.',
  'Copying the answer teaches you nothing, and you came here to learn, not to collect marks.',
  'Nice try, but the exam knows. Your brain knows too, use it.',
  'If you peek now, the certificate will know it was not earned. And so will you.',
  'Shortcut le lo, ya learning le lo. You cannot take both.',
];

export const CERTIFICATE_QUOTES = [
  'You did not just finish a course. You started a habit your future self will thank you for.',
  'Nobody is born knowing money. Everyone who knows it once decided to learn, just like you did today.',
  'The best investment you made this month was not in a fund. It was in yourself.',
  'Small steps, learned properly, beat big leaps taken blindly.',
  'Financial clarity is not a luxury for the wealthy. It is the foundation of freedom for everyone.',
  'Compounding works in mutual funds, but the greatest compounding begins with financial knowledge.',
  'You traded your curiosity for confidence, and no market crash can ever take that away.',
  'True wealth is not having all the answers. It is knowing how to make calm, informed decisions.',
  'A patient mind with a simple index fund will always outlast the loudest tipster in the room.',
  'Every disciplined rupee you invest tomorrow will carry the strength of what you learned today.',
];

export function getRandomRoast(): string {
  const index = Math.floor(Math.random() * SKIP_ROAST_MESSAGES.length);
  return SKIP_ROAST_MESSAGES[index];
}

export function getRandomCopyRoast(): string {
  const index = Math.floor(Math.random() * COPY_GUARD_MESSAGES.length);
  return COPY_GUARD_MESSAGES[index];
}

export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * CERTIFICATE_QUOTES.length);
  return CERTIFICATE_QUOTES[index];
}

export function generateCertificateId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomHex = '';
  for (let i = 0; i < 6; i++) {
    randomHex += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FA-2026-${randomHex}`;
}

export function formatCompletionDate(d: Date = new Date()): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

const DEFAULT_PROGRESS: CourseProgress = {
  passedLevels: [],
  levelScores: {},
  finalExamPassed: false,
  finalExamScore: null,
  certificateClaimed: false,
  recipientName: '',
  certificateId: '',
  certificateQuote: '',
  certificateDate: '',
};

export function loadCourseProgress(): CourseProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      passedLevels: Array.isArray(parsed.passedLevels) ? parsed.passedLevels : [],
      levelScores: parsed.levelScores || {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveCourseProgress(progress: CourseProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

/**
 * Checks whether a level is unlocked.
 * Level 1 is always unlocked.
 * Level N is unlocked only if level N-1 has been passed (score >= 2/3).
 */
export function isLevelUnlocked(levelId: number, passedLevels: number[]): boolean {
  if (levelId === 1) return true;
  return passedLevels.includes(levelId - 1);
}

/**
 * Checks whether the final exam is unlocked.
 * Unlocks only after all 7 levels are passed.
 */
export function isFinalExamUnlocked(passedLevels: number[]): boolean {
  const requiredLevels = [1, 2, 3, 4, 5, 6, 7];
  return requiredLevels.every((lvl) => passedLevels.includes(lvl));
}

/**
 * Checks whether the certificate is unlocked.
 * Unlocks only after the final exam is passed.
 */
export function isCertificateUnlocked(finalExamPassed: boolean): boolean {
  return finalExamPassed;
}

/**
 * Returns the level the learner actually needs to complete next.
 */
export function getNextRequiredLevel(passedLevels: number[]): number {
  for (let lvl = 1; lvl <= 7; lvl++) {
    if (!passedLevels.includes(lvl)) {
      return lvl;
    }
  }
  return 7;
}
