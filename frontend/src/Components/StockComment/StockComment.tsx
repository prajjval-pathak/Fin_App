import React from "react";
import StockCommentForm, {
  CommentsSchema,
} from "../StockCommentForm/StockCommentForm";
import { CommentGetApi, CommentPostApi } from "../../Services/CommentService";
import { toast } from "react-toastify";
import CommentList, { CommentGet } from "../CommentList/CommentList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Props = {
  ticker: string;
};

const StockComment = ({ ticker }: Props) => {
  const [comments, setComments] = React.useState<CommentGet[] | undefined>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    handleGetComments();
  }, []);
  const handleCommentSubmit = (e: CommentsSchema) => {
    CommentPostApi(e.title, e.content, ticker)
      .then((res) => {

        toast.success("Comment Posted Successfully");
        handleGetComments();
      })
      .catch((e: any) => {
        toast.warning(e);
      });
  };
  const handleGetComments = () => {
    const handleGetComment = async () => {
      setLoading(true);
      const res = await CommentGetApi(ticker);
      setComments(res?.data!);
      setLoading(false);
    };
    handleGetComment();
  };
  return (
    <div className="flex flex-col">
      {loading ? (
        <LoadingSpinner />
      ) : (
        comments && <CommentList comments={comments} />
      )}
      <StockCommentForm
        handleComment={(e) => handleCommentSubmit(e)}
        stockSymbol={ticker}
      />
    </div>
  );
};

export default StockComment;
