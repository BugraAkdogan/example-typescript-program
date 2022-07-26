import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LoggedIn from "./LoggedIn";

function SignIn() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  function handleClick(e: any) {
    //add Link
    console.log("clicked");
    return <LoggedIn />;
  }
  console.log(user.name);
  return (
    <div>
      <button onClick={handleClick}>Sign In</button>
    </div>
  );
}

export default SignIn;
