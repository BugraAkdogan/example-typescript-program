import MaterialTable, { Column } from "@material-table/core";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getPatientsData, Patient } from "../data";
import PatientListItems from "../data/components/PatientListItems";
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
    <MaterialTable
      data={patient}
      columns={[
        {
          field: "PID",
          title: "Patient ID",
        },
        {
          field: "NAME",
          title: "Name",
        },
      ]}
      detailPanel={({ rowData: patient }) => <DetailPanel patient={patient} />}
    />
  );
}

const DetailPanel = (props: { patient: Patient }) => {
  const { patient } = props;
  useEffect(() => {
    window.alert("getting lab data now");
  }, []);
  return <div>{JSON.stringify(patient)}</div>;
};

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
