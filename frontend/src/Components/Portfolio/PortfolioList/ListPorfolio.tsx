import React from "react";
import CardPortfolio from "../CardPortfolo/CardPortfolio";
import { PortfolioGet } from "../../../CompanyTypes";
interface Props {
  portfolioValues: PortfolioGet[] | [];
  handleCardPortfolioDelete: (e: any) => void;
}

const ListPorfolio = ({
  portfolioValues,
  handleCardPortfolioDelete,
}: Props) => {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 lg:px-10">
      <div className="mb-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-darkBlue">
          Portfolio
        </p>
        <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
          My Portfolio
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
          Your dashboard starts with the stocks you have saved. Remove names you
          no longer track, or jump into a company page for deeper financial
          review.
        </p>
      </div>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {portfolioValues.length > 0 ? (
            portfolioValues.map((portfolioValue) => {
              return (
                <CardPortfolio
                  portfolioValue={portfolioValue.symbol}
                  handleCardPortfolioDelete={handleCardPortfolioDelete}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>
  );
};

export default ListPorfolio;
