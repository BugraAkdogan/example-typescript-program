import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { resetUser } from "../redux/slices/userSlice";

function Logout() {
  const dispatch = useAppDispatch();

  dispatch(resetUser());
  return <Navigate to="/" replace />;
}

export default Logout;
