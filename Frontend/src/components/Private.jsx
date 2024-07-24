import React, { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
function Private(props) {
  const loggedData = useContext(userContext);

  return (
    <>
      {loggedData.loggedUser !== null ? (
        <props.Component />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Private;
