import React, { SyntheticEvent, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Cards from "./Components/Cards/Cards";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./CompanyTypes";
import { searchCompanies } from "./api";

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

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
  const handlePortfolioCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="App">
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
