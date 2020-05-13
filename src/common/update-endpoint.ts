import {TImageMeta} from "./search-endpoint";

export type TAuthorUpdateEndpointRequest = Pick<TImageMeta, "id" | "author">
export type TAuthorUpdateEndpointResponse = Pick<TImageMeta, "id" | "author">
