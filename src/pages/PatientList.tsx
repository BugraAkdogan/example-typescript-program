import MaterialTable from "@material-table/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { DetailPanel } from "../components/DetailPanel";
import { Grid } from "@mui/material";

function PatientList() {
  const pts = useSelector((state: RootState) => state.patientList.patients);
  const ptListLoading = useSelector(
    (state: RootState) => state.patientList.loading
  );

  return (
    <Grid container>
      <Grid item xs={12}>
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
          isLoading={ptListLoading}
          options={{
            emptyRowsWhenPaging: false,
            rowStyle: {
              backgroundColor: "#f7f7f7",
            },
            loadingType: "overlay",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default PatientList;
