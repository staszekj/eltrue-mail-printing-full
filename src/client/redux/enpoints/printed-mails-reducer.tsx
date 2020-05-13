import { produce } from "immer";
import { createReducer } from "typesafe-actions";
import { TRootAction } from "../../redux/root-action";

type TPrintedMail = {
  id: string,
  date: string
}

export interface TPrintedMailsReducer {
  data: Array<TPrintedMail>
}

export const initialState: TPrintedMailsReducer = {
  data: [{ id: "1", date: "2020-01-01" }]
};

export const printedMailReducer = createReducer<TPrintedMailsReducer, TRootAction>(
  initialState
);

