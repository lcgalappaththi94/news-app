import React, {useReducer} from 'react';
import {AppContext, type ContextType} from './AppContext.tsx';
import {appReducer, initialState} from './Reducer.tsx';


export const ArticleContextProvider = ({children}: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const providerValue: ContextType = {state, dispatch};

    return (
        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>
    );
};