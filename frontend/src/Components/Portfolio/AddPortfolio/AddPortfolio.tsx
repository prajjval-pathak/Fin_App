import React, { SyntheticEvent } from "react";

interface Props {
  symbol: string;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const AddPortfolio = ({ symbol, onPortfolioCreate }: Props) => {
  return (
    <form onSubmit={onPortfolioCreate}>
      <input readOnly={true} hidden={true} value={symbol} />
      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
};

export default AddPortfolio;
