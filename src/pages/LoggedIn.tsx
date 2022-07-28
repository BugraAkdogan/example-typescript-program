import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getUserData, User } from "../data";
import { setUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";

function LoggedIn() {
  // const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setLoading(true);
    getUserData(1)
      .then((result) => {
        const { error, msg } = validateGetUser(result);
        if (error) {
          console.error("No Result");
          return;
        } else {
          // setUser(result.DATA[0]);
          dispatch(setUser(result.DATA[0]));
          // console.log(result.DATA[0]);
        }
      })
      .then((err) => console.error(err))
      .finally(() => setLoading(false));
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
      <p>{JSON.stringify(user)}</p>
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

export default LoggedIn;
