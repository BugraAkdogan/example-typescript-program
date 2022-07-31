import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getPatientLabsData, Lab } from "../data";
import { toggleLoading, setPatientLabs } from "../redux/slices/patientLabSlice";
import { RootState } from "../redux/store";

function PatientLabs() {
  const dispatch = useDispatch();
  const patientID = useSelector(
    (state: RootState) => state.patientList.selectedPatient
  );
  const loading = useSelector(
    (state: RootState) => state.selectedPatientLabs.loading
  );
  const patientLabs = useSelector(
    (state: RootState) => state.selectedPatientLabs.patientLabs
  );

  useEffect(() => {
    if (patientID === 0) return;
    dispatch(toggleLoading());
    getPatientLabsData(patientID)
      .then((result) => {
        const { error, msg } = validateGetPatientLabs(result);
        if (error) {
          console.log(patientID);
          console.log(msg);
          return;
        } else {
          dispatch(setPatientLabs(result.DATA));
        }
      })
      .then((err) => console.error(err))
      .finally(() => dispatch(toggleLoading()));
  }, [patientID]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <ul>
      <h1>Patient Labs</h1>
      {patientLabs.map((l, i) => {
        return (
          <li key={i}>
            Patient ID:{l.PID} Lab Type:{l.LAB} Result:
            {l.RESULT} Date:{l.DATE}
          </li>
        );
      })}
    </ul>
  );
}

function validateGetPatientLabs(res: CclReturnData<Lab>): {
  error: boolean;
  msg?: string;
} {
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the labs" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the labs" };
  }

  return { error: false };
}

export default PatientLabs;
