export type numberOfQuestions = {
  nameOfQuestion: string;
  answer1: string;
  answer2: string;
  answer3?: string;
  answer4?: string;
  answer5?: string;
  correctAnswer: number;
};

export type Prof = {
  codeOfProg: number;
  nameOfProf: string;
  numberOfQuestions: number;
};
export type TnumberNameProfs = {
  id: number;
  number: number;
  nameOfProf: string;
  nameTS: string;
};
