import axios, { InternalAxiosRequestConfig } from "axios";
import { CommentsSchema } from "../Components/StockCommentForm/StockCommentForm";
import { handleError } from "../ErrorHandler/ErrorHandler";
import { CommentGet } from "../Components/CommentList/CommentList";

const CommentApi = axios.create({
  baseURL: "https://financeappbackend.somee.com/",
});
CommentApi.interceptors.request.use((ct: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    ct.headers.Authorization = `Bearer ${token}`;
  }
  return ct;
});
export const CommentPostApi = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const postComment = await CommentApi.post<CommentsSchema>(
      `/api/Comment/${symbol}`,
      { title: title, content: content }
    );
    return postComment;
  } catch (e: any) {
    handleError(e);
  }
};
export const CommentGetApi = async (symbol: string) => {
  try {
    const getComment = await CommentApi.get<CommentGet[]>(
      `/api/Comment?symbol=${symbol}`
    );
    return getComment;
  } catch (e: any) {
    handleError(e);
  }
};
