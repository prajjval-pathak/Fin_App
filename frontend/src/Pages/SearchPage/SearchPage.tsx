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
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
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
      toast.warning("Search operation failed");
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
      <section className="mx-auto mt-8 max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-darkBlue">
                Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">
                Search stocks, manage your portfolio, and open company fundamentals.
              </h1>
              <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
                Start with your saved portfolio below, search for more companies,
                add the names you want to track, and open each company page for
                profile, income statement, balance sheet, and cash flow details.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-3 lg:max-w-md">
              <div className="rounded-2xl bg-stone-100 px-4 py-3">
                Portfolio is your saved workspace.
              </div>
              <div className="rounded-2xl bg-stone-100 px-4 py-3">
                Search is for discovering new stocks.
              </div>
              <div className="rounded-2xl bg-stone-100 px-4 py-3">
                Company pages are for deeper review.
              </div>
            </div>
          </div>
        </div>
      </section>
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
