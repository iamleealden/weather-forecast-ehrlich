import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";

function App() {
  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated);
  return (
    <div>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/weather" element={<MainScreen />} />
      </Routes>
    </div>
  );
}

export default App;
