import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";
import Nav2 from "./components/Nav2";

import Firebase, { FirebaseContext } from "./components/shared/Firebase";

// Global state for theme options

import App from "./App"; /* webpackChunkName: "App" */
import Theme from "App/Theme"; /* webpackChunkName: "Theme" */
import ServiceWorkerProvider from "components/shared/ServiceWorkerProvider";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Theme>
      <Nav2> </Nav2>
      <App />
      <ServiceWorkerProvider />
    </Theme>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://2cb4b0fa634941a69b5bdd868a07a024@sentry.io/1878459"
  });
}

serviceWorker.register();
