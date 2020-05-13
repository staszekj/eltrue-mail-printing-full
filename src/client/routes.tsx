import { Route, Switch } from "react-router-dom";
import App from "./view/App";
import React, { FunctionComponent, useEffect } from "react";
import { appInitAction } from "./view/app-actions";
import { useDispatch } from "react-redux";
import {PrintedMails} from './view/printed-mails/printed-mails'

export const AppRoutes: FunctionComponent = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appInitAction());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Switch>
      <Route path="/printed-mails">
        <PrintedMails />
      </Route>
      <Route exact={true} path="/">
        <App />
      </Route>
    </Switch>
  );
};
