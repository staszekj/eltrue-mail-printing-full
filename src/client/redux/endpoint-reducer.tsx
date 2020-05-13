import { combineReducers } from "redux";
import { printedMailReducer, TPrintedMailsReducer } from "../redux/enpoints/printed-mails-reducer";

export interface TEndpointsReducer {
  printedMails: TPrintedMailsReducer,
}

export const endpointReducer = combineReducers<TEndpointsReducer>({
  printedMails: printedMailReducer,
});

