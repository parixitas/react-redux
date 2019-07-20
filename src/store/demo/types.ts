import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface IDemoState {
    list: any[]
}

export enum Constants {
    ADD_ITEM = 'ADD_ITEM'
}

export type DemoActions = ActionType<typeof actions>;