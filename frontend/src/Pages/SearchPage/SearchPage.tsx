import React, { SyntheticEvent, useEffect, useState } from "react";
import Search from "../../Components/Search/Search";
import ListPorfolio from "../../Components/Portfolio/PortfolioList/ListPorfolio";
import CardList from "../../Components/CardList/CardList";
import { searchCompanies } from "../../api";
import { CompanySearch, PortfolioGet } from "../../CompanyTypes";
import {
  PortfolioApiDelete,
  PortfolioApiGet,
  PortfolioApiPost,
} from "../../Services/PortfolioService";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | []>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    GetPortfolioList();
  }, []);
  const GetPortfolioList = async () => {
    try {
      setLoading(true);
      const res = await PortfolioApiGet();
      setPortfolioValues(res?.data!);
      setLoading(false);
    } catch (error) {
      toast.warning("Failed to get Portfolio List");
    }
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
    const portfolioPost = async () => {
      try {
        await PortfolioApiPost(e.target[0].value);
        GetPortfolioList();
        toast.success("Added to Portfolio");
      } catch (error) {
        toast.warning("Failed to add to Portfolio");
      }
    };
    portfolioPost();
  };
  const handleCardPortfolioDelete = (e: any) => {
    e.preventDefault();
    const portfolioDelete = async () => {
      try {
        console.log(e.target[0].value);
        await PortfolioApiDelete(e.target[0].value);
        GetPortfolioList();
      } catch (error) {
        toast.warning("Failed to delete from Portfolio");
      }
    };
    portfolioDelete();
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ListPorfolio
          handleCardPortfolioDelete={handleCardPortfolioDelete}
          portfolioValues={portfolioValues}
        />
      )}
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
