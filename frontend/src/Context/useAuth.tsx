import { Navigate, useNavigate } from "react-router";
import { UserAccountToken, UserProfile } from "../CompanyTypes";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Login, RegisterUser } from "../Services/AuthService";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: (username: string, password: string) => void;
  registerUser: (email: string, username: string, password: string) => void;
  isLoggedIn: () => boolean;
  logoutUser: () => void;
  isLoading: boolean;
};
type Props = { children: React.ReactNode };
const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer" + token;
    }
    setIsReady(true);
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await Login(username, password);
      if (res) {
        localStorage.setItem("token", res?.data.token);

        const userObj = {
          username: res?.data.userName,
          email: res?.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj!);
        setToken(res?.data.token!);
        setIsLoading(false);
        // navigate("/search");
        toast.success("login Sucess");
      }
    } catch (error) {
      setIsLoading(false);
      toast.warning("Internal Server error");
    }
  };
  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const res = await RegisterUser(email, username, password);
      if (res) {
        localStorage.setItem("token", res?.data.token);
        const regUser = {
          email: res?.data.email,
          username: res?.data.userName,
        };
        localStorage.setItem("user", JSON.stringify(regUser));
        setToken(res?.data.token!);
        setUser(regUser!);
        navigate("/search");
        setIsLoading(false);
        toast.success("Registeration Success");
      }
    } catch (e) {
      setIsLoading(false);
      toast.warning("Internal Server Error Occured");
    }
  };
  const isLoggedIn = () => {
    return !!user;
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    axios.defaults.headers.common["Authorization"] = "";
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        registerUser,
        loginUser,
        isLoggedIn,
        logoutUser,
        isLoading,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
