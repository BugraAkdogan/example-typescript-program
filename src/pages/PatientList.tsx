import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getPatientsData, Patient } from "../data";
import {
  toggleLoading,
  setPatients,
  setSelectedPatient,
} from "../redux/slices/patientsSlice";
import { RootState } from "../redux/store";

function PatientList() {
  const dispatch = useDispatch();
  const patient = useSelector((state: RootState) => state.patientList.patients);
  const loading = useSelector((state: RootState) => state.patientList.loading);
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    dispatch(toggleLoading());
    getPatientsData(providerPid)
      .then((res) => {
        const { error, msg } = validateGetPatients(res);
        if (error) console.log(msg);
        else dispatch(setPatients(res.DATA));
      })
      .then((err) => console.error(err))
      .finally(() => dispatch(toggleLoading()));
  }, []);

  function handleSelectPatientClick(PID: number) {
    dispatch(setSelectedPatient(PID));
  }

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <ul>
      <h1>My Patients</h1>
      {patient.map((p, i) => {
        return (
          <li key={i}>
            <Button
              variant="outlined"
              onClick={() => handleSelectPatientClick(p.PID)}
            >
              Select
            </Button>
            {p.NAME} ({p.CDCR})
          </li>
        );
      })}
    </ul>
  );
}

function validateGetPatients(res: CclReturnData<Patient>): {
  error: boolean;
  msg?: string;
} {
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the patients" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the patients" };
  }
  return { error: false };
}

export default PatientList;
