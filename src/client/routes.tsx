import {Route, Switch} from "react-router-dom";
import App from "./view/App";
import React, {FunctionComponent, useContext, useEffect} from "react";
import {appInitAction} from "./view/app-actions";
import {useDispatch} from "react-redux";
import {PrintedMails} from './view/printed-mails/printed-mails'
import {AppContext} from "./contexts/app-context";

export const AppRoutes: FunctionComponent = () => {

    const dispatch = useDispatch();
    const appContext = useContext(AppContext);
    useEffect(() => {
        if (!appContext) {
            return
        }
        appContext.printedMails.api.downloadMails();
        dispatch(appInitAction());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!appContext) {
        return null
    }

    return (
        <Switch>
            <Route path="/printed-mails">
                <PrintedMails printedMailsApi={appContext.printedMails}/>
            </Route>
            <Route exact={true} path="/">
                <App/>
            </Route>
        </Switch>
    );
};
