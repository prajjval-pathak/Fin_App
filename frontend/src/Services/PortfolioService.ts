import axios, { InternalAxiosRequestConfig } from "axios";
import { handleError } from "../ErrorHandler/ErrorHandler";
import { PortfolioGet } from "../CompanyTypes";

const PortfolioApi = axios.create({
  baseURL: "https://financeappbackend.somee.com",
});
PortfolioApi.interceptors.request.use((ct: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    ct.headers.Authorization = `Bearer ${token}`;
  }
  return ct;
});
export const PortfolioApiPost = async (symbol: string) => {
  try {
    const postPortfolio = await PortfolioApi.post(
      `/api/Portfolio?symbl=${symbol}`
    );
    return postPortfolio;
  } catch (e: any) {
    console.log(e);
  }
};
export const PortfolioApiGet = async () => {
  try {
    const getPortfolio = await PortfolioApi.get<PortfolioGet[]>(
      `/api/Portfolio`
    );
    return getPortfolio;
  } catch (error) {
    handleError(error);
  }
};
export const PortfolioApiDelete = async (symbol: string) => {
  try {
    const deletePortfolio = await PortfolioApi.delete(
      `/api/Portfolio?symbol=${symbol}`
    );
    return deletePortfolio;
  } catch (error) {
    handleError(error);
  }
};
