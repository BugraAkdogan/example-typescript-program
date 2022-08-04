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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CclReturnData,
  getPatientLabsData,
  getPatientsData,
  Lab,
  Patient,
} from "../data";
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

  return (
    <MaterialTable
      title="Patient List"
      data={patient}
      //TODO: how to access EIDS[]?
      columns={[
        {
          field: "PID",
          title: "Patient ID",
        },
        {
          field: "NAME",
          title: "Name",
        },
        {
          field: "CDCR",
          title: "CDCR",
        },
      ]}
      detailPanel={({ rowData: patient }) => <DetailPanel patient={patient} />}
      isLoading={loading}
      options={{
        rowStyle: {
          backgroundColor: "lightgray",
        },
        loadingType: "linear",
      }}
    />
  );
}

const DetailPanel = (props: { patient: Patient }) => {
  const { patient } = props;
  // console.log(patient.PID);
  // console.log(patient);
  const [loading, setLoading] = useState(false);
  const [patientLabs, setPatientLabs] = useState<Lab[]>([]);
  useEffect(() => {
    setLoading(true);
    getPatientLabsData(patient.PID)
      .then((res) => {
        const { error, msg } = validateGetPatientLabs(res);
        if (error) alert(msg);
        else {
          // console.log("success");
          setPatientLabs(res.DATA);
        }
      })
      .then((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MaterialTable
      data={patientLabs}
      columns={[
        {
          field: "PID",
          title: "Patient ID",
        },
        {
          field: "LAB",
          title: "Lab",
        },
        {
          field: "RESULT",
          title: "Result",
        },
        {
          field: "UNIT",
          title: "Unit",
        },
        {
          field: "REF_RANGE",
          title: "Ref. Range",
        },
        {
          field: "FLAG",
          title: "Flag",
        },
        {
          field: "DATE",
          title: "Date",
          type: "date",
          dateSetting: { locale: "en-US" },
        },
      ]}
      isLoading={loading}
      options={{
        search: false,
        showTitle: false,
        loadingType: "linear",
        padding: "dense",
        rowStyle: {
          backgroundColor: "#6ABAC9",
        },
        exportAllData: true,

        toolbar: false,
      }}
      style={{
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingTop: "-30px",
        fontWeight: "bold",
      }}
      components={{
        OverlayLoading: (loading) => <div>Loading...</div>,
      }}
    />
  );
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

export default PatientList;
