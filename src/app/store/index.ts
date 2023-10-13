import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  IQuestionsState,
  questionsFeatureKey,
  questionsReducer,
} from './questions/questions.reducer';

export interface IState {
  [questionsFeatureKey]: IQuestionsState;
}

export const reducers: ActionReducerMap<IState> = {
  [questionsFeatureKey]: questionsReducer,
};

export const metaReducers: MetaReducer<IState>[] = isDevMode() ? [] : [];
