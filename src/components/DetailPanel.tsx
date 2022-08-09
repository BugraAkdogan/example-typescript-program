import MaterialTable, { Column } from "@material-table/core";
import { useEffect, useState } from "react";
import { CclReturnData, getPatientLabsData, Lab, Patient } from "../data";

const columnsSchema: Array<Column<Lab>> = [
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
];

export const DetailPanel = (props: { patient: Patient }) => {
  const { patient } = props;
  const [loading, setLoading] = useState(false);
  const [patientLabs, setPatientLabs] = useState<Lab[]>([]);
  useEffect(() => {
    setLoading(true);
    getPatientLabsData(patient.PID)
      .then((res) => {
        const { error, msg } = validateGetPatientLabs(res);
        if (error) alert(msg);
        else {
          setPatientLabs(res.DATA);
        }
      })
      .then((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [patient.PID]);

  return (
    <MaterialTable
      data={patientLabs}
      columns={columnsSchema}
      isLoading={loading}
      options={{
        emptyRowsWhenPaging: false,
        search: false,
        showTitle: false,
        loadingType: "overlay",
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
    />
  );
};

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
