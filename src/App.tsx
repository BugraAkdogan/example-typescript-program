import LoggedIn from "./pages/LoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import SignIn from "./pages/SignIn";
import { Route, Routes, Link } from "react-router-dom";
import { reset } from "./redux/slices/userSlice";

export default () => {
  // const user = useSelector((state: RootState) => state.user.name);
  // const dispatch = useDispatch();
  // dispatch(reset);
  // return user ? <LoggedIn /> : <SignIn />;

  return <LoggedIn />;
};
