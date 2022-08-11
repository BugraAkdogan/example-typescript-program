import labs from "./json/patientLabs.json";
import patients from "./json/patientList.json";
import user from "./json/userData.json";

export type Todo = {
  id: number;
  title: string;
  category: string;
  description: string;
  complete: boolean;
  date: string;
};

export type Metadata = {
  CODE: number;
  MSG: string;
  DATE: string;
  NAME: string;
  POSITION: string;
  PARAMETERS: string;
};

export type CclReturnData<T> = {
  META: Array<Metadata>;
  DATA: Array<T>;
};

export type User = {
  NAME: string;
  POSITION: string;
  PHYSICIAN: string;
  PID: number;
};

export type Lab = {
  PID: number;
  LAB: string;
  DATE: string;
  RESULT: string;
  UNIT: string;
  REF_RANGE: string;
  FLAG: string;
};

type Encounter = {
  EID: number;
  TYPE: string;
  INST: string;
  REG_DT_TM: string;
};

export type Patient = {
  PROVIDER_PID: number;
  PID: number;
  NAME: string;
  CDCR: string;
  EIDS: Array<Encounter>;
  NEW_TO_PANEL: number;
};

/**
 * Get laboratory data for a given patient by patient ID.
 * @param pid The id of the patient to get labs for.
 * @returns `Promise` of `CclReturnData<Lab>`
 */
export async function getPatientLabsData(
  pid: number
): Promise<CclReturnData<Lab>> {
  const returnData: CclReturnData<Lab> = JSON.parse(JSON.stringify(labs));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (labs) {
        returnData.DATA = returnData.DATA.filter((lab) => lab.PID === pid);
        resolve(returnData);
      } else reject("Labs list was invalid or missing");
    }, 1000);
  });
}

/**
 * Get a list of patients for a given provider based on the provider's ID.
 * @param pid The ID of the provider to get a patient list for.
 * @returns `Promise` of `CclReturnData<Patient>`
 */
export async function getPatientListData(
  pid: number
): Promise<CclReturnData<Patient>> {
  const returnData: CclReturnData<Patient> = patients;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (patients) {
        returnData.DATA = returnData.DATA.filter((p) => p.PROVIDER_PID === pid);
        resolve(returnData);
      } else reject("Patients list was invalid or missing");
    }, 1000);
  });
}

/**
 * Get user data for person.
 * @param uid {number} - the user id to get user data for
 * @returns a `Promise` of `CclReturnData<User>`
 */
export async function getUserData(uid: number): Promise<CclReturnData<User>> {
  const returnData: CclReturnData<User> = user;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user) resolve(returnData);
      else reject("user data was invalid or missing");
    }, 1000);
  });
}
