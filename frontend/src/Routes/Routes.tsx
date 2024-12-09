import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hero from "../Components/Hero/Hero";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
// import DesignPage from "../Pages/DesignPage/DesignPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlow from "../Components/CashFlow/CashFlow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Hero />,
      },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "company-design",
      //   element: (
      //     <ProtectedRoute>
      //       <DesignPage />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "company/:ticker",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "company-profile",
            element: <CompanyProfile />,
          },
          {
            path: "income-statement",
            element: <IncomeStatement />,
          },
          { path: "balance-sheet", element: <BalanceSheet /> },
          {path:"cash-flow",element:<CashFlow/>}
        ],
      },
    ],
  },
]);
export default router;
