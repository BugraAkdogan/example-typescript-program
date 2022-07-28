import { CclReturnData, getPatientLabs, Lab } from "../data";

function PatientLabs() {
  getPatientLabs(1)
    .then((result) => {
      const { error, msg } = validateGetPatientLabs(result);
      if (error) {
        console.error("No Result");
        return;
      } else {
        // setUser(result.DATA[0]);
        return { result };
        // console.log(result.DATA[0]);
      }
    })
    .then((err) => console.error(err));
}

function validateGetPatientLabs(res: CclReturnData<Lab>): {
  error: boolean;
  msg?: string;
} {
  // console.log(res.META);
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the patients" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the patients" };
  }
  // if (res.DATA.length > 1) {
  //   return {
  //     error: true,
  //     msg: "more than one user was found; was expecting only one",
  //   };
  // }
  return { error: false };
}

export default PatientLabs;
