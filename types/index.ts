export interface VocabularyItem {
  word: string;
  collocation: string;
  definition: string;
  azMeaning: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Düzgün cavabın indeksi (0, 1, 2...)
  explanation: string;
}

export interface LessonData {
  id: string;
  level: string;
  day: number;
  title: string;
  source: string;
  audioUrl?: string;
  paragraphs: string[];
  vocabulary: VocabularyItem[];
  quiz: QuizQuestion[];
}