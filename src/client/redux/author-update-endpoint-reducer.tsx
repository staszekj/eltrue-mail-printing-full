import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {EEndpointStatus} from "../../common/endpoints"
import {authorUpdateAsyncAction} from "../view/app-actions";
import {
    TAuthorUpdateEndpointRequest,
    TAuthorUpdateEndpointResponse
} from "../../common/update-endpoint";

export interface TAuthorUpdateEndpoint {
    status: EEndpointStatus,
    request: TAuthorUpdateEndpointRequest,
    response: TAuthorUpdateEndpointResponse
}

export const initialState: TAuthorUpdateEndpoint = {
    status: EEndpointStatus.INIT,
    request: {
        id: "",
        author: ""
    },
    response: {
        id: "",
        author: ""
    }
};

export const authorUpdateEndpointReducer = createReducer<TAuthorUpdateEndpoint, TRootAction>(
    initialState
)
    .handleAction(authorUpdateAsyncAction.request, (state, action) =>
        produce(state, draftState => {
            draftState.status = EEndpointStatus.PENDING;
            draftState.request = action.payload
        })
    )
    .handleAction(authorUpdateAsyncAction.success, (state, action) =>
        produce(state, draftState => {
            draftState.status = EEndpointStatus.SUCCESS;
            draftState.response = action.payload
        })
    )
    .handleAction(authorUpdateAsyncAction.failure, (state, action) =>
        produce(state, draftState => {
            draftState.status = EEndpointStatus.ERROR;
            draftState.response = initialState.response
        })
    );

