import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Context/useAuth";
import { SpeedInsights } from "@vercel/speed-insights/react";
function App() {
  return (
    <div className="App">
      <SpeedInsights />
      <AuthProvider>
        <NavBar />
        <Outlet />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
