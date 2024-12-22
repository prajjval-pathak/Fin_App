import React from "react";
import CommentListItem from "../CommentListItem/CommentListItem";

type Props = {
  comments: CommentGet[];
};

export type CommentGet = {
  title: string;
  content: string;
  userName: string;
};

const CommentList = ({ comments }: Props) => {
  // return comments.length === 0 ? (
  //   ""
  // ) : (
  return (
    <>
      {comments.map((comment) => {
        return <CommentListItem comment={comment} />;
      })}
    </>
  );
};

export default CommentList;
