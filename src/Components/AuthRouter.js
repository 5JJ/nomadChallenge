import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRouter = ({ authToken, component: Component }) => {
  return (
    <Route
      render={(props) =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRouter;
