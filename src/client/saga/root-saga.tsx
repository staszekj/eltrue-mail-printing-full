import { takeLeading, takeLatest } from "redux-saga/effects";
import {
    searchComponentTypingAction,
    appInitAction,
    deleteImageAsyncAction, authorUpdateAsyncAction
} from "../view/app-actions";
import {
    appInitSaga,
    searchComponentTypingSaga, tileImageDeleteSaga
} from "./search-component-typing-saga";
import {oneImageComponentEnterTitleSaga} from "./one-image-component-typing-saga";

export function* rootSaga() {
    yield takeLeading(appInitAction, appInitSaga);
    yield takeLatest(searchComponentTypingAction, searchComponentTypingSaga);
    yield takeLatest(deleteImageAsyncAction.request, tileImageDeleteSaga);
    yield takeLatest(authorUpdateAsyncAction.request, oneImageComponentEnterTitleSaga);
}


