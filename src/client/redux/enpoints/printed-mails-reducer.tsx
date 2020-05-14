import { produce } from "immer";
import { createReducer } from "typesafe-actions";
import { TRootAction } from "../../redux/root-action";
import {
  fetchPrintedMailsAsyncAction,
} from "../../view/app-actions";
import { EEndpointStatus } from "../../../common/endpoints";
import { TPrintedMailsResponse } from "../../../common/printed-mails-endpoint";


export interface TPrintedMailsReducer {
  status: EEndpointStatus,
  response: TPrintedMailsResponse
}

export const initialState: TPrintedMailsReducer = {
  status: EEndpointStatus.INIT,
  response: []
};

export const printedMailReducer = createReducer<TPrintedMailsReducer, TRootAction>(
  initialState
).handleAction(fetchPrintedMailsAsyncAction.success, (state, action) =>
  produce(state, draftState => {
    draftState.status = EEndpointStatus.SUCCESS;
    draftState.response = action.payload;
  })
);

