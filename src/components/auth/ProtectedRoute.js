import React,{useContext} from "react";
import { Redirect,Route } from "react-router-dom";
import AuthContext from "../context/Auth-Context";
const ProtectedRoute = ({ children,...rest }) => {
    const AuthCtx = useContext(AuthContext);

  console.log("Check user in Private: ", AuthCtx.user);
  return (
    <Route
      {...rest}
      render={() => {
        return AuthCtx.user ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default ProtectedRoute;