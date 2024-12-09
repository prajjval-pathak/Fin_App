import React, { SyntheticEvent, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Cards from "./Components/Cards/Cards";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./CompanyTypes";
import { searchCompanies } from "./api";
import ListPorfolio from "./Components/Portfolio/PortfolioList/ListPorfolio";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Context/useAuth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Outlet />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
