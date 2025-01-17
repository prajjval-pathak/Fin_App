import React from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePorfolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../../CompanyTypes";

interface Props {
  portfolioValue: string;
  handleCardPortfolioDelete: (e: any) => void;
}

const CardPortfolio = ({
  portfolioValue,
  handleCardPortfolioDelete,
}: Props) => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <Link
        to={`/company/${portfolioValue}`}
        className="pt-6 text-xl font-bold"
      >
        {portfolioValue}
      </Link>
      <DeletePortfolio
        portfolioValue={portfolioValue}
        handleCardPortfolioDelete={handleCardPortfolioDelete}
      />
    </div>
  );
};

export default CardPortfolio;
