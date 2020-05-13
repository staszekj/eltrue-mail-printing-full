import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {searchComponentTypingAction} from '../view/app-actions'

export interface TSearchCompomentReducer {
    inputString: string
}

export const initialState: TSearchCompomentReducer = {
    inputString: ""
};

export const searchComponentReducer = createReducer<TSearchCompomentReducer, TRootAction>(
    initialState
).handleAction(searchComponentTypingAction, (state, action) =>
    produce(state, draftState => {
        draftState.inputString = action.payload.inputString
    })
);

