import React, {createContext, FunctionComponent, useState} from 'react';
import {usePrintedMails, TPrintedMailsApi} from '../hooks/printed-mails-hook'


export type TAppContext = {
    printedMails: TPrintedMailsApi
};
export const AppContext = createContext<TAppContext | null>(null);


export const AppContextProvider: FunctionComponent<{}> = ({children}) => {
    const appContextValue: TAppContext = {
        printedMails: usePrintedMails()
    };
    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    )
};
