import React, { SyntheticEvent } from "react";
import "./card.css";
import { CompanySearch } from "../../CompanyTypes";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
interface Props {
  id: string;
  company: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}
const Cards = ({ id, company, onPortfolioCreate }: Props) => {
  return (
    <>
      <div className="cards">
        <img
          src="https://images.unsplash.com/photo-1612428978260-2b9c7df20150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="apple"
        />
        <div className="details">
          <h2>
            {company.name}({company.symbol})
          </h2>
          <p>$ {company.currency}</p>
        </div>
        <p className="info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          quisquam libero et, dolor facilis dolorum delectus sed illum quam
          totam tempore consequatur, natus ratione itaque nihil recusandae
          tenetur minima ad!
        </p>
        <AddPortfolio
          onPortfolioCreate={onPortfolioCreate}
          symbol={company.symbol}
        />
      </div>
    </>
  );
};
export default Cards;
