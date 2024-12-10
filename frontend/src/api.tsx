import axios, { InternalAxiosRequestConfig } from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
} from "./CompanyTypes";
import { handleError } from "./ErrorHandler/ErrorHandler";

interface SearchResponse {
  data: CompanySearch[];
}
export const apiClient = axios.create({
  baseURL: "https://finapp.somee.com/api/",
});
apiClient.interceptors.request.use((ct: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    ct.headers.Authorization = `Bearer ${token}`;
  }
  return ct;
});
export const searchCompanies = async (query: string) => {
  try {
    const res = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${process.env.REACT_APP_Api_key}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
export const getCompanyProfile = async (query: string) => {
  try {
    const res = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message", error.message);
      return error.message;
    } else {
      handleError(error);
    }
  }
};
export const getCompanyKeyMetrics = async (query: string) => {
  try {
    const res = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
export const getIncomeStatement = async (query: string) => {
  try {
    const res = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
export const getBalanceSheet = async (query: string) => {
  try {
    const res = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
export const getCashFlowStatement = async (query: string) => {
  try {
    const res = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
