export interface TImageMeta {
    id: string,
    downloadUrl: string,
    width: number,
    height: number,
    author: string,
    imageV300Url: string,
    widthV300: number
}

export interface TSearchEndpointRequest {
    search: string
}
export type TSearchEndpointResponse = Array<TImageMeta>;
