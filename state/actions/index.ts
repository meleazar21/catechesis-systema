import { ActionTypes } from "../action-types";


interface IDisplayDrawer {
    type: ActionTypes.DISPLAY_DRAWER;
    payload: boolean;
}
interface ISetLoading {
    type: ActionTypes.SET_LOADING;
    payload: boolean;
}
interface ISetUserInfo {
    type: ActionTypes.SET_USER_INFO;
    payload: string;
}


export type Actions = IDisplayDrawer | ISetLoading | ISetUserInfo;