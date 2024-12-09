import React, { SyntheticEvent } from "react";
import Cards from "../Cards/Cards";
import { v4 as uuidv4 } from "uuid";
import { CompanySearch } from "../../CompanyTypes";
interface Props {
  searchArray: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList = ({ searchArray, onPortfolioCreate }: Props) => {
  return (
    <>
      {searchArray.length <= 0 ? (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      ) : (
        searchArray.map((ele) => {
          return (
            <Cards
              id={ele.symbol}
              key={uuidv4()}
              company={ele}
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      )}
    </>
  );
};

export default CardList;
