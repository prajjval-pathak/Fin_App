import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  loading?: boolean;
};

const LoadingSpinner = ({ loading = true }: Props) => {
  return (
    <div id="loader">
      <ClipLoader
        color="black"
        // id="loader"
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default LoadingSpinner;
