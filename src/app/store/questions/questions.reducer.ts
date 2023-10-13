import { createReducer, on } from '@ngrx/store';

import { IQuestion } from 'src/app/interfaces/questions.interfaces';
import { createAnswersAction, createQuestionAction } from './questions.actions';

export const questionsFeatureKey = 'questions';

export interface IQuestionsState {
  questionsList: IQuestion[];
}

export const initialState: IQuestionsState = {
  questionsList: [],
};

export const questionsReducer = createReducer(
  initialState,
  on(createQuestionAction, (state, { question }) => ({
    ...state,
    questionsList: [...state.questionsList, question],
  })),

  on(createAnswersAction, (state, { questions }) => ({
    ...state,
    questionsList: questions,
  }))
);
