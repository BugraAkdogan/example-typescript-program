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
  // return (
  //   <ul>
  //     <h1>My Patients</h1>
  //     {patient.map((p, i) => {
  //       return (
  //         <li key={i}>
  //           <Button
  //             variant="outlined"
  //             onClick={() => handleSelectPatientClick(p.PID)}
  //           >
  //             Select
  //           </Button>
  //           <PatientListItems {...p} />
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );
  // ...p, ...{ PID: p.PID }

  // return (
  //   <MaterialTable
  //     // data={patient.map((p) => ({ id: p.PID, name: p.NAME }))}
  //     data={[
  //       { id: 1, name: "Joe" },
  //       { id: 2, name: "Mary" },
  //     ]}
  //     columns={[
  //       { field: "Patient ID", title: "Patient ID" },
  //       { field: "Name", title: "Name" },
  //     ]}
  //   />
  // );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell align="left">NAME</TableCell>
            <TableCell align="center">CDCR</TableCell>
            <TableCell align="right">TYPE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patient.map((p, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {p.PID}
              </TableCell>
              <TableCell align="left">{p.NAME}</TableCell>
              <TableCell align="center">{p.CDCR}</TableCell>
              <TableCell align="right">{p.EIDS[0].TYPE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // return <PatientListItems {...patient} />;
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
