import {createStandardAction, createAsyncAction} from "typesafe-actions";
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../../common/search-endpoint";
import {TDeleteEndpointRequest, TDeleteEndpointResponse} from "../../common/delete-endpoint";
import {TOneImageComponentReducer} from "../redux/one-image-component-reducer";
import {TAuthorUpdateEndpointRequest, TAuthorUpdateEndpointResponse} from "../../common/update-endpoint";
import {TSearchCompomentReducer} from "../redux/search-component-reducer";


export const appInitAction = createStandardAction(
    "app/INIT"
)();

export const searchComponentTypingAction = createStandardAction(
    "search-component/TYPING"
)<Pick<TSearchCompomentReducer, "inputString">>();

export const searchComponentSelectOneImageAction = createStandardAction(
    "search-component/SELECT_ONE_IMAGE"
)<Pick<TOneImageComponentReducer, "arrayId">>();

export const searchComponentPictureClickAction = createStandardAction(
    "search-component/PICTURE_CLICK"
)<Pick<TOneImageComponentReducer, "arrayId">>();

export const fetchImageMetaAsyncAction = createAsyncAction(
    'search-endpoint/REQUEST',
    'search-endpoint/SUCCESS',
    'search-endpoint/FAILURE',
    'search-endpoint/CANCEL'
)<Pick<TSearchEndpointRequest, "search">, TSearchEndpointResponse, {}, {}>();

export const deleteImageAsyncAction = createAsyncAction(
    'delete-endpoint/REQUEST',
    'delete-endpoint/SUCCESS',
    'delete-endpoint/FAILURE',
    'delete-endpoint/CANCEL'
)<Pick<TDeleteEndpointRequest, "id"> & Pick<TOneImageComponentReducer, "arrayId" | "show">,
    Pick<TDeleteEndpointResponse, "id"> & Pick<TOneImageComponentReducer, "arrayId" | "show">,
    {}, {}>();

export const authorUpdateAsyncAction = createAsyncAction(
    'author-update-endpoint/REQUEST',
    'author-update-endpoint/SUCCESS',
    'author-update-endpoint/FAILURE',
    'author-update-endpoint/CANCEL'
)<TAuthorUpdateEndpointRequest, TAuthorUpdateEndpointResponse, {}, {}>();

export const oneImageComponentCloseClickAction = createStandardAction(
    "one-image-component/CLOSE_CLICK"
)();

export const oneImageComponentForwardClickAction = createStandardAction(
    "one-image-component/FORWARD_CLICK"
)<Pick<TOneImageComponentReducer, "arrayId">>();

export const oneImageComponentBackwardClickAction = createStandardAction(
    "one-image-component/BACKWARD_CLICK"
)<Pick<TOneImageComponentReducer, "arrayId">>();
