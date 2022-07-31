import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getUserData, User } from "../data";
import { setUser, toggleLoading } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";

function PhysicianData() {
  const loading = useSelector((state: RootState) => state.user.loading);
  const {
    NAME: name,
    POSITION: position,
    PHYSICIAN: isPhysician,
  } = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoading());
    getUserData(providerPid)
      .then((res) => {
        const { error, msg } = validateGetUser(res);
        if (error) {
          console.warn(msg);
          return;
        } else dispatch(setUser(res.DATA[0]));
      })
      .then((err) => console.error(err))
      .finally(() => dispatch(toggleLoading()));
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <p>{`${name} (${position} - ${
        isPhysician.toLowerCase() === "yes" ? "Physician" : "Not Physician"
      })`}</p>
    </div>
  );
}

function validateGetUser(res: CclReturnData<User>): {
  error: boolean;
  msg?: string;
} {
  // console.log(res.META);
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the user" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the user" };
  }
  if (res.DATA.length > 1) {
    return {
      error: true,
      msg: "more than one user was found; was expecting only one",
    };
  }
  return { error: false };
}

export default PhysicianData;
