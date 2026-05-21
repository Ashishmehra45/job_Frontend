import AdminScreen from "../../AdminScreen";
import Login from "./Login";
import ProviderScreen from "../../ProviderScreen";
import JobSeekerScreen from "../../JobSeekerScreen";
import jwtDecode from "jwt-decode";

function Mdashboard() {
  const authToken = localStorage.getItem("token");

  if (authToken) {
    const redAuthToken = jwtDecode(authToken);

    if (redAuthToken.role === "Admin") {
      return <AdminScreen />;
    }

    if (redAuthToken.role === "Job Provider") {
      return <ProviderScreen />;
    }

    if (redAuthToken.role === "User") {
      return <JobSeekerScreen />;
    }
  }

  return <Login />;
}

export default Mdashboard;