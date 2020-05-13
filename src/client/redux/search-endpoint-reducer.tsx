import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../../common/search-endpoint"
import {EEndpointStatus} from "../../common/endpoints"
import {fetchImageMetaAsyncAction, deleteImageAsyncAction, authorUpdateAsyncAction} from "../view/app-actions";
import _ from 'lodash'

export interface TSearchEndpoint {
    status: EEndpointStatus,
    request: TSearchEndpointRequest,
    response: TSearchEndpointResponse
}

export const initialState: TSearchEndpoint = {
    status: EEndpointStatus.INIT,
    request: {
        search: ""
    },
    response: []
};

export const searchEndpointReducer = createReducer<TSearchEndpoint, TRootAction>(
    initialState
)
    .handleAction(fetchImageMetaAsyncAction.request, (state, action) =>
        produce(state, draftState => {
            draftState.status = EEndpointStatus.PENDING;
            draftState.request = action.payload
        })
    )
    .handleAction(fetchImageMetaAsyncAction.success, (state, action) =>
        produce(state, draftState => {
            draftState.status = EEndpointStatus.SUCCESS;
            draftState.response = action.payload
        })
    ).handleAction(deleteImageAsyncAction.success, (state, action) =>
        produce(state, draftState => {
            _.remove(draftState.response, {"id": action.payload.id});
        })
    ).handleAction(authorUpdateAsyncAction.success, (state, action) =>
        produce(state, draftState => {
            const dataToChange = _.find(draftState.response, {"id": action.payload.id});
            if (dataToChange) {
                dataToChange.author = action.payload.author;
            }
        })
    );

