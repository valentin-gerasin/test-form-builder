import { createAction, props } from '@ngrx/store';

import { IQuestion } from 'src/app/interfaces/questions.interfaces';

enum EQuestionsActions {
  CREATE_QUESTION = 'Create question',
  CREATE_ANSWERS = 'Create answers',
}

export const createQuestionAction = createAction<
  EQuestionsActions.CREATE_QUESTION,
  { question: IQuestion }
>(EQuestionsActions.CREATE_QUESTION, props<{ question: IQuestion }>());

export const createAnswersAction = createAction<
  EQuestionsActions.CREATE_ANSWERS,
  { questions: IQuestion[] }
>(EQuestionsActions.CREATE_ANSWERS, props<{ questions: IQuestion[] }>());
