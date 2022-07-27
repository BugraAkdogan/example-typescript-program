import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getPatients, Patient } from "../data";
import { setPatient } from "../redux/slices/patientsSlice";
import { RootState } from "../redux/store";

type Props = {};

function PatientList({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const patient = useSelector((state: RootState) => state.patient);

  useEffect(() => {
    setLoading(true);
    getPatients(1)
      .then((result) => {
        const { error, msg } = validateGetPatients(result);
        if (error) {
          console.error("No Result");
          return;
        } else {
          // setUser(result.DATA[0]);
          //dispatch(setPatient(result.DATA[1]));
          result.DATA.forEach((p) => {
            console.log(p);
            dispatch(setPatient(p));
          });
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
    <ul>
      <li>{JSON.stringify(patient)}</li>
    </ul>
  );
}

function validateGetPatients(res: CclReturnData<Patient>): {
  error: boolean;
  msg?: string;
} {
  // console.log(res.META);
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the patients" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the patients" };
  }
  // if (res.DATA.length > 1) {
  //   return {
  //     error: true,
  //     msg: "more than one user was found; was expecting only one",
  //   };
  // }
  return { error: false };
}

export default PatientList;
