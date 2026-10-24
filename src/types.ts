export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseLevel {
  id: number;
  title: string;
  tagline: string;
  readTime: string;
  sections: {
    heading: string;
    content: string[];
    everydayAnalogy?: string;
  }[];
  numericExample: {
    scenario: string;
    breakdown: { label: string; value: string }[];
    conclusion: string;
  };
  quiz: QuizQuestion[];
}

export interface BeyondAsset {
  id: string;
  title: string;
  category: string;
  summary: string;
  whoItSuits: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedReturn: string;
  liquidity: string;
  keyRule: string;
}

export interface RbiInstrument {
  name: string;
  fullName: string;
  explanation: string;
  whyItMatters: string;
  typicalImpact: string;
}

export interface SebiFraud {
  name: string;
  warningSigns: string;
  howItWorks: string;
  preventionTip: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Basics' | 'Mutual Funds' | 'Macro' | 'Tax & Legal' | 'Metrics';
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'SEBI Regulation' | 'RBI Policy' | 'Mutual Fund Math';
  date: string;
  readTime: string;
  summary: string;
  storyContent: string[];
  takeaways: string[];
}

export interface AnnouncementItem {
  id: string;
  source: 'RBI' | 'SEBI';
  title: string;
  category: string;
  date: string;
  summary: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  modelUsed?: string;
  timestamp: string;
}
