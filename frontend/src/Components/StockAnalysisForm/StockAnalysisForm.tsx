import React, { useState } from "react";
import { toast } from "react-toastify";
import { CompanySearch } from "../../CompanyTypes";
import { searchCompanies } from "../../api";

interface Props {
  onSubmit: (tickers: string[]) => void;
  isLoading: boolean;
}

const StockAnalysisForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<CompanySearch[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const runSearch = async () => {
    const query = searchTerm.trim();
    if (!query) {
      toast.error("Enter a company name or ticker to search");
      return;
    }

    try {
      setIsSearching(true);
      const result = await searchCompanies(query);
      if (Array.isArray(result)) {
        setSearchResults(result);
        if (result.length === 0) {
          toast.info("No matching stocks found");
        }
        return;
      }

      setSearchResults([]);
      toast.error("Search operation failed");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await runSearch();
  };

  const handleAddStock = (company: CompanySearch) => {
    if (selectedStocks.some((stock) => stock.symbol === company.symbol)) {
      toast.warning(`${company.symbol} is already selected`);
      return;
    }

    if (selectedStocks.length >= 3) {
      toast.error("You can analyze up to 3 stocks");
      return;
    }

    setSelectedStocks((current) => [...current, company]);
  };

  const handleRemoveStock = (symbol: string) => {
    setSelectedStocks((current) =>
      current.filter((stock) => stock.symbol !== symbol)
    );
  };

  const handleAnalyzeClick = () => {
    if (selectedStocks.length === 0) {
      toast.error("Select at least 1 stock");
      return;
    }

    onSubmit(selectedStocks.map((stock) => stock.symbol));
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSelectedStocks([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Stock Analysis
        </h2>
        <p className="text-gray-600 mb-6">
          Search by company name or ticker, add up to 3 stocks, and analyze
          them with AI-powered insights.
        </p>

        <form onSubmit={handleSearchSubmit} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Stocks
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company name or ticker"
              disabled={isLoading || isSearching}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isLoading || isSearching}
              className="bg-slate-800 text-white font-semibold py-2 px-5 rounded-lg hover:bg-slate-900 disabled:bg-gray-400 transition duration-200"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Search Results</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {searchResults.slice(0, 8).map((company) => {
                const isSelected = selectedStocks.some(
                  (stock) => stock.symbol === company.symbol
                );

                return (
                  <div
                    key={`${company.symbol}-${company.exchangeShortName}`}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {company.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {company.symbol} | {company.exchangeShortName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddStock(company)}
                      disabled={isLoading || isSelected}
                      className="w-10 h-10 rounded-full bg-green-100 text-green-700 text-xl font-bold hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400"
                      aria-label={`Add ${company.symbol}`}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Selected Stocks</h3>
            <span className="text-sm text-gray-500">
              {selectedStocks.length}/3 selected
            </span>
          </div>
          {selectedStocks.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-500">
              No stocks selected yet. Search above and add up to 3.
            </div>
          ) : (
            <div className="space-y-3">
              {selectedStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{stock.name}</p>
                    <p className="text-sm text-gray-600">
                      {stock.symbol} | {stock.exchangeShortName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveStock(stock.symbol)}
                    disabled={isLoading}
                    className="w-10 h-10 rounded-full bg-red-100 text-red-700 text-lg font-bold hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400"
                    aria-label={`Remove ${stock.symbol}`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAnalyzeClick}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
          >
            {isLoading ? "Analyzing..." : "Analyze Stocks"}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleClear}
            className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition duration-200"
          >
            Clear
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Search by company name, then add up to 3 stocks to analyze using
          their tickers behind the scenes.
        </p>
      </div>
    </div>
  );
};

export default StockAnalysisForm;
