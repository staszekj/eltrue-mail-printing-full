import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {
    deleteImageAsyncAction,
    oneImageComponentBackwardClickAction,
    oneImageComponentCloseClickAction, oneImageComponentForwardClickAction, searchComponentPictureClickAction,
    searchComponentSelectOneImageAction,
} from '../view/app-actions'

export interface TOneImageComponentReducer {
    arrayId: number;
    show: boolean
}

export const initialState: TOneImageComponentReducer = {
    arrayId: 0,
    show: false
};

export const oneImageComponentReducer = createReducer<TOneImageComponentReducer, TRootAction>(
    initialState
).handleAction([
        searchComponentSelectOneImageAction,
        searchComponentPictureClickAction,
        oneImageComponentForwardClickAction,
        oneImageComponentBackwardClickAction],
    (state, action) =>
        produce(state, draftState => {
            draftState.arrayId = action.payload.arrayId;
            draftState.show = true;
        })
).handleAction(oneImageComponentCloseClickAction, (state, action) =>
    produce(state, draftState => {
        draftState.show = false
    })
).handleAction(deleteImageAsyncAction.success, (state, action) =>
    produce(state, draftState => {
        draftState.arrayId = action.payload.arrayId;
        draftState.show = action.payload.show;
    }));
