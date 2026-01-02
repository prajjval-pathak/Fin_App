import { handleError } from "../ErrorHandler/ErrorHandler";
import { UserAccountToken } from "../CompanyTypes";
import { apiClient } from "../api";

export const Login = async (username: string, password: string) => {
  try {
    const data = await apiClient.post<UserAccountToken>(
      "account/login",
      {
        username: username,
        password: password,
      }
    );

    return data;
  } catch (error) {
    console.log("here", error);
    handleError(error);
    throw error; // Re-throw to be caught by useAuth
  }
};
export const RegisterUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await apiClient.post<UserAccountToken>(
      "account/register",
      {
        email: email,
        username: username,
        password: password,
      }
    );
    return data;
  } catch (e) {
    handleError(e);
    throw e; // Re-throw to be caught by useAuth
  }
};
// export const isAuthenticateCheck = async () => {
//   const apiClient = axios.create({
//     baseURL: "https://localhost:44396/api/account/", // Replace with your API's base URL
//   });
// };
