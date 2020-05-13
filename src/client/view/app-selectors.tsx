import {TRootState} from "../redux/root-reducer";
import {EEndpointStatus} from "../../common/endpoints";

export const getSearchComponentInputString = (state: TRootState) => state.searchComponent.inputString;
export const getFoundImages = (state: TRootState) => state.searchEndpoint.response;
export const getFoundImagesLenght = (state: TRootState) => state.searchEndpoint.response.length;


export const isOneImageShow = (state: TRootState) => state.oneImageComponent.show;
export const getOneImage = (state: TRootState) => getFoundImagesLenght(state) > 0 ?
    getFoundImages(state)[state.oneImageComponent.arrayId % getFoundImagesLenght(state)]
    : null;

export const getArrayId = (state: TRootState) => state.oneImageComponent.arrayId;
export const getPrevArrayId = (state: TRootState) => (state.oneImageComponent.arrayId - 1) % getFoundImagesLenght(state);
export const getNextArrayId = (state: TRootState) => (state.oneImageComponent.arrayId + 1) % getFoundImagesLenght(state);
export const getNextArrayIdAfterDelete = (state: TRootState) => getFoundImagesLenght(state) > 1 && getFoundImagesLenght(state) - 1 > getArrayId(state) ?
    getArrayId(state) : 0;
export const isShowAfterDelete = (state: TRootState) => getFoundImagesLenght(state) > 1 ? isOneImageShow(state) : false;

export const isAuthorUpdateRequestPending = (state: TRootState) => state.authorUpdateEndpoint.status === EEndpointStatus.PENDING;

export const getTheme = (state: TRootState) => state.theme;
