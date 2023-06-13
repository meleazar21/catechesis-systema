import { IUserInfo } from "@/interfaces/user-info";
import { createContext } from "react";

export type InitialStateType = {
    isDrawerOpen: boolean;
    loading: boolean;
    userInfo: IUserInfo | null;
}

export const initialState: InitialStateType = {
    isDrawerOpen: false,
    loading: false,
    userInfo: null
}

export const StoreContext = createContext<{ state: InitialStateType, dispatch: React.Dispatch<any> }>({ state: initialState, dispatch: () => null });