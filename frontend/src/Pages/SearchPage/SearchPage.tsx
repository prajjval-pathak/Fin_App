import React, { SyntheticEvent, useState } from "react";
import Search from "../../Components/Search/Search";
import ListPorfolio from "../../Components/Portfolio/PortfolioList/ListPorfolio";
import CardList from "../../Components/CardList/CardList";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../CompanyTypes";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const searchRes = await searchCompanies(search);
    //Type Narrowing to avoid type mismatch
    if (typeof searchRes === "string") {
      setServerError("Search operation failed");
    } else if (Array.isArray(searchRes)) {
      setSearchResult(searchRes);
    }
  };
  const handlePortfolioCreate = (e: any) => {
    e.preventDefault();
    const doesExist = portfolioValues.find((ele) => ele === e.target[0].value);
    if (doesExist) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };
  const handleCardPortfolioDelete = (e: any) => {
    console.log(e);
    const filteredLi = portfolioValues.filter((ele) => ele !== e.target.value);
    setPortfolioValues(filteredLi);
  };
  return (
    <>
      <ListPorfolio
        handleCardPortfolioDelete={handleCardPortfolioDelete}
        portfolioValues={portfolioValues}
      />
      <Search
        handleChange={handleChange}
        searchString={search}
        onSearchSubmit={handleSearchSubmit}
      />
      <CardList
        searchArray={searchResult}
        onPortfolioCreate={handlePortfolioCreate}
      />
    </>
  );
};
export default SearchPage;
