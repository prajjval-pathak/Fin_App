import axios from "axios";

import { handleError } from "../ErrorHandler/ErrorHandler";
import { UserAccountToken } from "../CompanyTypes";

export const Login = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserAccountToken>(
      "https://financeappbackend.somee.com/api/account/login",
      {
        username: username,
        password: password,
      }
    );

    return data;
  } catch (error) {
    console.log("here", error);
    handleError(error);
  }
};
export const RegisterUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserAccountToken>(
      "https://financeappbackend.somee.com/api/account/register",
      {
        email: email,
        username: username,
        password: password,
      }
    );
    return data;
  } catch (e) {
    handleError(e);
  }
};
// export const isAuthenticateCheck = async () => {
//   const apiClient = axios.create({
//     baseURL: "https://localhost:44396/api/account/", // Replace with your API's base URL
//   });
// };
