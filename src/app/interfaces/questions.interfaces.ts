import { EQuestionType } from '../enums/question-type.enums';

export interface IQuestion {
  type: EQuestionType;
  question: string;
  options?: string[];
  custom?: boolean;
  required: boolean;
  answers: string[];
}
