// TODO: 🔴 DEPRECATED 🔴
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "constants/routes";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.NOT_FOUND.path);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN.path)
      );
    }

    componentWillUnmount() {
      this.listener();
    }
    // Deprecated us authUser from global state
    //  const [{ authUser, firebase }] = useGlobal();
    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
