import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
type Props = {};

const NavBar = (props: Props) => {
  const { isLoggedIn, logoutUser, user } = useAuth();
  return isLoggedIn() ? (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>

          <div className="hidden font-bold lg:flex">
            <Link to={"search"} className="text-black hover:text-darkBlue">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <div className="hover:text-darkBlue">Welcome {user?.username}</div>
          <button
            onClick={logoutUser}
            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to={"search"} className="text-black hover:text-darkBlue">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <Link to={"login"} className="hover:text-darkBlue">
            Login
          </Link>
          <Link
            to={"register"}
            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default NavBar; 
