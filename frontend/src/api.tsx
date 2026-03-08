import axios, { InternalAxiosRequestConfig } from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  GeminiAnalysisRequest,
  GeminiAnalysisResponse,
} from "./CompanyTypes";
import { handleError } from "./ErrorHandler/ErrorHandler";

export const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://financeappbackend.somee.com/api/"
      : "https://localhost:44396/api/",
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
    const res = await apiClient.get<CompanySearch[]>(
      `FMP/search?query=${query}`,
    );
    console.log(res);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const res = await apiClient.get<CompanyProfile[]>(
      `FMP/profile?symbol=${query}`,
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
    const res = await apiClient.get<CompanyKeyMetrics[]>(
      `FMP/key-metrics?symbol=${query}`,
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getIncomeStatement = async (query: string) => {
  try {
    const res = await apiClient.get<CompanyIncomeStatement[]>(
      `FMP/income-statement?symbol=${query}`,
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const res = await apiClient.get<CompanyBalanceSheet[]>(
      `FMP/balance-sheet?symbol=${query}`,
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getCashFlowStatement = async (query: string) => {
  try {
    const res = await apiClient.get<CompanyCashFlow[]>(
      `FMP/cash-flow?symbol=${query}`,
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const analyzeStocks = async (tickers: string[]) => {
  try {
    const request: GeminiAnalysisRequest = { tickers };
    const res = await apiClient.post<GeminiAnalysisResponse>(
      "report/analyze",
      request,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while analyzing stocks.",
      );
    }
    handleError(error);
    throw new Error("An unexpected error occurred while analyzing stocks.");
  }
};
