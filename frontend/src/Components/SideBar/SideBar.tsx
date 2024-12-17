import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHome, FaTable, FaMoneyBill } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { ticker } = useParams(); // Get the 'ticker' from the URL

  // Close sidebar and navigate within the nested route
  const handleNavigation = (path: string, id: string) => {
    setIsOpen(false); // Close sidebar
    navigate(path); // Navigate to the relative nested route

    // Scroll to the element after navigation
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      {/* Burger Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-3xl text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 transform transition-transform duration-300 ease-in-out z-40 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex`}
      >
        <div className="flex flex-col min-h-full px-0 overflow-y-auto">
          <div className="flex flex-col list-none">
            <button
              onClick={() => handleNavigation(`/company/${ticker}/company-profile`, "company-profile")}
              className="flex items-center text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaHome />
              <h6 className="ml-3">Company Profile</h6>
            </button>
            <button
              onClick={() => handleNavigation(`/company/${ticker}/income-statement`, "income-statement")}
              className="flex items-center text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTable />
              <h6 className="ml-3">Income Statement</h6>
            </button>
            <button
              onClick={() => handleNavigation(`/company/${ticker}/balance-sheet`, "balance-sheet")}
              className="flex items-center text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTableCells />
              <h6 className="ml-3">Balance Sheet</h6>
            </button>
            <button
              onClick={() => handleNavigation(`/company/${ticker}/cash-flow`, "cash-flow")}
              className="flex items-center text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaMoneyBill />
              <h6 className="ml-3">Cashflow Statement</h6>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
