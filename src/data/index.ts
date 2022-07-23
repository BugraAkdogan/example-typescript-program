import labs from "./json/patientLabs.json";
import patients from "./json/patientList.json";
import user from "./json/userData.json";

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

type Lab = {
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

type Patient = {
  PROVIDER_PID: number;
  PID: number;
  NAME: string;
  CDCR: string;
  EIDS: Array<Encounter>;
  NEW_TO_PANEL: number;
};

export async function getPatientLabs(pid: number): Promise<CclReturnData<Lab>> {
  throw new Error("Not implemented");
}

export async function getPatients(
  uid: number
): Promise<CclReturnData<Patient>> {
  throw new Error("Not implemented");
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
