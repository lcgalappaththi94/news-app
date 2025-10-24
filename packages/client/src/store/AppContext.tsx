import {createContext, type Dispatch} from 'react';
import type {AppState} from "./Reducer.tsx";
import type {Action} from "../lib/actionTypes.ts";

export type ContextType = {
    state: AppState,
    dispatch: Dispatch<Action>,
};


export const AppContext = createContext<ContextType>({} as ContextType);