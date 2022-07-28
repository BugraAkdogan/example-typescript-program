import LoggedIn from "./pages/LoggedIn";
import PatientList from "./pages/PatientList";
import PatientLabs from "./pages/PatientLabs";

export default () => {
  return (
    <div>
      <LoggedIn />
      <PatientList />
      <PatientLabs />
    </div>
  );
};
