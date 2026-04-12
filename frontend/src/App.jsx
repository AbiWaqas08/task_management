import AppRoutes from "./routes/AppRoutes";
import { setToken } from "./api/axios";

const token = localStorage.getItem("token");
if (token) {
  setToken(token);
}

function App() {
  return <AppRoutes />;
}

export default App;