import {TRootState} from "../../redux/root-reducer";

export const getMails = (state: TRootState) => state.endpoints.printedMails.data;
