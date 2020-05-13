import { combineReducers } from "redux";

import { History } from "history";


import { searchEndpointReducer, TSearchEndpoint } from "./search-endpoint-reducer";
import { searchComponentReducer, TSearchCompomentReducer } from "./search-component-reducer";

import { oneImageComponentReducer, TOneImageComponentReducer } from "./one-image-component-reducer";
import { authorUpdateEndpointReducer, TAuthorUpdateEndpoint } from "./author-update-endpoint-reducer";
import { themeReducer, TThemeReducer } from "./theme-reducer";
import { connectRouter, RouterState } from "connected-react-router";
import { endpointReducer, TEndpointsReducer } from "../redux/endpoint-reducer";

export interface TRootState {
  endpoints: TEndpointsReducer,
  searchEndpoint: TSearchEndpoint,
  authorUpdateEndpoint: TAuthorUpdateEndpoint,
  searchComponent: TSearchCompomentReducer,
  oneImageComponent: TOneImageComponentReducer,
  theme: TThemeReducer,
  router: RouterState,
}

export const rootReducer = (history: History) => combineReducers<TRootState>({
  endpoints: endpointReducer,
  searchEndpoint: searchEndpointReducer,
  authorUpdateEndpoint: authorUpdateEndpointReducer,
  searchComponent: searchComponentReducer,
  oneImageComponent: oneImageComponentReducer,
  theme: themeReducer,
  router: connectRouter(history)
});

