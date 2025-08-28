export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  category: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Answer {
  text: string;
  score: number;
}

export type NewQuestion = Omit<Question, "_id" | "createdAt" | "updatedAt">;
