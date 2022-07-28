import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getPatientsData, Patient } from "../data";
import { toggleLoading, setPatients } from "../redux/slices/patientsSlice";
import { AppDispatch, RootState } from "../redux/store";

function PatientList() {
  const dispatch = useDispatch();
  const patient = useSelector((state: RootState) => state.patient.patients);
  const loading = useSelector((state: RootState) => state.patient.loading);

  useEffect(() => {
    dispatch(toggleLoading());
    getPatientsData(1)
      .then((res) => {
        dispatch(setPatients(res.DATA));
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
    <ul>
      {patient.map((p, i) => {
        return (
          <li key={i}>
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
  console.log(res.META);
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the patients" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the patients" };
  }
  return { error: false };
}

export default PatientList;
