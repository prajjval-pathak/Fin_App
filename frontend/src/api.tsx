import axios from "axios";
import { CompanySearch } from "./CompanyTypes";

interface SearchResponse {
  data: CompanySearch[];
}
export const searchCompanies = async (query: string) => {
  try {
    const res = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${process.env.REACT_APP_Api_key}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message", error.message);
      return error.message;
    } else {
      console.log("Unexpected Error");
      return "Unexpected errror has occured";
    }
  }
};
