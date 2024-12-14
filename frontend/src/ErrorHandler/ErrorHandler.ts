import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (err: any) => {
  if (axios.isAxiosError(err)) {
    let error = err.response;
    if (Array.isArray(error?.data.errors)) {
      for (let val of error!.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof error?.data.errors == "object") {
      for (let val in error.data.errors) {
        toast.warning(error.data.errors[val][0]);
      }
    } else if (error?.data) {
      toast.warning(error.data);
    } 
  }
};
