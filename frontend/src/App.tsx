import React, { SyntheticEvent, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Cards from "./Components/Cards/Cards";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./CompanyTypes";
import { searchCompanies } from "./api";
import ListPorfolio from "./Components/Portfolio/PortfolioList/ListPorfolio";

function App() {
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

  return (
    <div className="App">
      <ListPorfolio portfolioValues={portfolioValues} />
      <Search
        handleChange={handleChange}
        searchString={search}
        onSearchSubmit={handleSearchSubmit}
      />
      <CardList
        searchArray={searchResult}
        onPortfolioCreate={handlePortfolioCreate}
      />
    </div>
  );
}

export default App;
