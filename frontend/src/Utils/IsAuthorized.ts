import { reduceEachLeadingCommentRange } from "typescript";
import { apiClient } from "../api";
import { AxiosError } from "axios";
import { handleError } from "../ErrorHandler/ErrorHandler";

export const isAuthorized = async () => {
  try {
    const isAuthenticatedCheck = await apiClient.get("account/isAuthenticated");
    if (isAuthenticatedCheck.status === 200) {
      return true;
    }
  } catch (e: any) {
    if (e.response && e.response.status === 401) {
      return false;
    } else {
      handleError(e);
    }
  }
};
