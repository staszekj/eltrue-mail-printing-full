import {ActionType} from "typesafe-actions";
import * as appActions from "../view/app-actions";

export type TRootAction = ActionType<typeof appActions>
