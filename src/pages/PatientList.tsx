import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getPatientsData, Patient } from "../data";
import { getPatientsListAsync } from "../redux/slices/patientsSlice";
import { AppDispatch, RootState } from "../redux/store";

type Props = {};

function PatientList({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const patient = useSelector((state: RootState) => state.patient);

  useEffect(() => {
    setLoading(true);
    dispatch(getPatientsListAsync());
    console.log(patient);
    setLoading(false);
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
      <li>{patient.map((p) => JSON.stringify(p.NAME))}</li>
    </ul>
  );
}

export default PatientList;
