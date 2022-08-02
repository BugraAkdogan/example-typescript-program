import { Patient } from "../../data/";
import MaterialTable from "@material-table/core";

const COLS = [
  { field: "Patient ID", title: "Patient ID" },
  { field: "Name", title: "Name" },
];

//export default function PatientListItems(NAME:string,PID:number,CDCR:number,EIDS[]:Patient["EIDS"]) {
export default function PatientListItems(patient: Patient[]) {
  const DATA = [
    { id: 2, name: "Joe" },
    { id: 1, name: "Mary" },
  ];
  // return (
  //   <span>
  //     {props.NAME} (Patient ID:{props.PID})
  //     <MaterialTable data={[{ id: 2, name: "Joe" }]} columns={COLS}
  //     />
  //   </span>
  // );
  return (
    <ul>
      <h1>My Patients</h1>
      {patient.map((p, i) => {
        return (
          <li key={i}>
            {p.NAME} (Patient ID:{p.PID})
          </li>
        );
      })}
    </ul>
  );
}
