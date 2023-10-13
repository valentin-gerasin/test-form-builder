import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IQuestionsState, questionsFeatureKey } from './questions.reducer';
import { IQuestion } from 'src/app/interfaces/questions.interfaces';

export const selectQuestionsFeature =
  createFeatureSelector<IQuestionsState>(questionsFeatureKey);

export const selectQuestionsList = createSelector(
  selectQuestionsFeature,
  (state: IQuestionsState) => state.questionsList
);
