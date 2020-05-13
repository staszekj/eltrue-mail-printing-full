import {ActionType} from "typesafe-actions";
import {call, put, select, delay} from 'redux-saga/effects'
import {
    fetchImageMetaAsyncAction,
    appInitAction,
    deleteImageAsyncAction
} from "../view/app-actions";
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../../common/search-endpoint";
import {getSearchComponentInputString} from "../view/app-selectors";
import {IMAGE_INFO_DELETE_ENDPOINT_PATH, IMAGE_INFO_SEARCH_ENDPOINT_PATH} from '../../common/endpoints'
import axios from 'axios';
import {TDeleteEndpointRequest, TDeleteEndpointResponse} from "../../common/delete-endpoint";


export const httpFetchImageInfo = async (request: TSearchEndpointRequest) => {
    const serverResponse = await axios.post<TSearchEndpointResponse>(IMAGE_INFO_SEARCH_ENDPOINT_PATH, request)
    return serverResponse.data;
};

export const httpDeleteImageInfo = async (request: TDeleteEndpointRequest) => {
    const serverResponse = await axios.delete<TDeleteEndpointResponse>(IMAGE_INFO_DELETE_ENDPOINT_PATH + '/' + request.id)
    return serverResponse.data;
};

export function* appInitSaga(
    action: ActionType<typeof appInitAction>
) {
    try {
        const request: TSearchEndpointRequest = {
            search: ''
        };
        yield put(
            fetchImageMetaAsyncAction.request(request)
        );
        const data = yield call(httpFetchImageInfo, request);
        yield put(
            fetchImageMetaAsyncAction.success(data)
        );
    } catch (error) {
        yield put(fetchImageMetaAsyncAction.failure({}));
    }
}

export function* searchComponentTypingSaga() {
    try {
        const inputString = yield select(getSearchComponentInputString);
        const request: TSearchEndpointRequest = {
            search: inputString
        };
        yield delay(500);
        yield put(
            fetchImageMetaAsyncAction.request(request)
        );
        const data = yield call(httpFetchImageInfo, request);
        yield put(
            fetchImageMetaAsyncAction.success(data)
        );
    } catch (error) {
        yield put(fetchImageMetaAsyncAction.failure({}));
    }
}

export function* tileImageDeleteSaga(
    action: ActionType<typeof deleteImageAsyncAction.request>
) {
    try {
        const response: TDeleteEndpointResponse = yield call(httpDeleteImageInfo, action.payload);
        yield put(
            deleteImageAsyncAction.success({...action.payload, ...response})
        );
    } catch (error) {
        yield put(deleteImageAsyncAction.failure({}));
    }
}
