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
const baseFinaceModelApi = "https://financialmodelingprep.com/stable";
export const apiClient = axios.create({
  baseURL: "https://financeappbackend.somee.com/api/",
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
      `${baseFinaceModelApi}/search-name?query=${query}&apikey=${process.env.REACT_APP_Api_key}`
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
      `${baseFinaceModelApi}/profile?symbol=${query}&apikey=${process.env.REACT_APP_Api_key}`
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
      `${baseFinaceModelApi}/key-metrics-ttm?symbol=${query}&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
export const getIncomeStatement = async (query: string) => {
  try {
    const res = await axios.get<CompanyIncomeStatement[]>(
      `${baseFinaceModelApi}/income-statement?symbol=${query}&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
export const getBalanceSheet = async (query: string) => {
  try {
    const res = await axios.get<CompanyBalanceSheet[]>(
      `${baseFinaceModelApi}/balance-sheet-statement?symbol=${query}&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
export const getCashFlowStatement = async (query: string) => {
  try {
    const res = await axios.get<CompanyCashFlow[]>(
      `${baseFinaceModelApi}/cash-flow-statement?symbol=${query}&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
