import MaterialTable from "@material-table/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CclReturnData, getPatientListData, Lab, Patient } from "../data";
import Layout from "../components/Layout";
import { toggleLoading, setPatients } from "../redux/slices/patientsSlice";
import { RootState } from "../redux/store";
import { DetailPanel } from "../components/DetailPanel";

function PatientList() {
  const dispatch = useDispatch();
  const pts = useSelector((state: RootState) => state.patientList.patients);
  const loading = useSelector((state: RootState) => state.patientList.loading);

  useEffect(() => {
    dispatch(toggleLoading());
    getPatientListData(providerPid)
      .then((res) => {
        const { error, msg } = validateGetPatients(res);
        if (error) console.log(msg);
        else dispatch(setPatients(res.DATA));
      })
      .then((err) => console.error(err))
      .finally(() => dispatch(toggleLoading()));
  }, []);

  return (
    <Layout>
      <MaterialTable
        title="Patient List"
        data={pts.map((pt, i) => ({ id: i, ...pt }))}
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
          {
            field: "EIDS",
            title: "Encounter Cnt",
            render: (rowData) => rowData.EIDS.length,
          },
        ]}
        detailPanel={({ rowData: patient }) => (
          <DetailPanel patient={patient} />
        )}
        isLoading={loading}
        options={{
          emptyRowsWhenPaging: false,
          rowStyle: {
            backgroundColor: "#f7f7f7",
          },
          loadingType: "overlay",
        }}
      />
    </Layout>
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
