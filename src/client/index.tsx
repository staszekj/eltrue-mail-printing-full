import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core";
import { createHashHistory } from "history";

import { rootSaga } from "./saga/root-saga";
import { rootReducer } from "./redux/root-reducer";
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { getTheme } from "./view/app-selectors";
import { routerMiddleware } from "connected-react-router";

import { ConnectedRouter } from "connected-react-router";
import { AppRoutes } from "./routes";

export const history = createHashHistory();

const composeEnv =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line @typescript-eslint/no-explicit-any
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer(history),
  undefined,
  composeEnv(applyMiddleware(routerMiddleware(history)), applyMiddleware(sagaMiddleware))
);

const ElTrueMuiProvider: FunctionComponent = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={useSelector(getTheme)}>
        {children}
      </MuiThemeProvider>
    </StylesProvider>
  );
};

sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ElTrueMuiProvider>
        <AppRoutes />
      </ElTrueMuiProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
