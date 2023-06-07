import { createContext } from "react";

export type InitialStateType = {
    isDrawerOpen: boolean;
    loading: boolean;
    userEmail: string;
}

export const initialState: InitialStateType = {
    isDrawerOpen: false,
    loading: false,
    userEmail: ""
}

export const StoreContext = createContext<{ state: InitialStateType, dispatch: React.Dispatch<any> }>({ state: initialState, dispatch: () => null });