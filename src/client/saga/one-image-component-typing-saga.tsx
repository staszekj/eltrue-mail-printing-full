import {ActionType} from "typesafe-actions";
import {call, put} from 'redux-saga/effects'
import {
    IMAGE_INFO_PUT_ENDPOINT_PATH,
} from '../../common/endpoints'
import axios from 'axios';
import {TAuthorUpdateEndpointRequest, TAuthorUpdateEndpointResponse} from "../../common/update-endpoint";
import {authorUpdateAsyncAction} from "../view/app-actions";

export const httpPutAuthorUpdate = async (request: TAuthorUpdateEndpointRequest) => {
    const serverResponse = await axios.put<TAuthorUpdateEndpointResponse>(IMAGE_INFO_PUT_ENDPOINT_PATH, request);
    return serverResponse.data;
};

export function* oneImageComponentEnterTitleSaga(
    action: ActionType<typeof authorUpdateAsyncAction.request>
) {
    try {
        const response: TAuthorUpdateEndpointResponse = yield call(httpPutAuthorUpdate, action.payload);
        yield put(
            authorUpdateAsyncAction.success(response)
        );
    } catch (error) {
        yield put(authorUpdateAsyncAction.failure({}));
    }
}
