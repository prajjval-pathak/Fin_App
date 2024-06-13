import React from "react";

interface Props {
  portfolioValue: string;
  handleCardPortfolioDelete: (e: any) => void;
}

const DeletePortfolio = ({
  handleCardPortfolioDelete,
  portfolioValue,
}: Props) => {
  return (
    <div>
      <form onSubmit={handleCardPortfolioDelete}>
        <input hidden={true} value={portfolioValue} />
        <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
          X
        </button>
      </form>
    </div>
  );
};
export default DeletePortfolio;
