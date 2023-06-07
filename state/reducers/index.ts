import { ActionTypes } from "../action-types";
import { Actions } from "../actions";
import { InitialStateType, initialState } from "@/store/store-context";

export const storeReducer = (state: InitialStateType = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.DISPLAY_DRAWER:
            return { ...state, isDrawerOpen: action.payload };
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload }
        case ActionTypes.SET_USER_INFO:
            return { ...state, userEmail: action.payload }
        default:
            return state;
    }
} 