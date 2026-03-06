import React, { useState } from "react";
import { toast } from "react-toastify";
import StockAnalysisForm from "../../Components/StockAnalysisForm/StockAnalysisForm";
import AnalysisResult from "../../Components/AnalysisResult/AnalysisResult";
import { analyzeStocks } from "../../api";

const StockAnalysisPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeStocks = async (tickers: string[]) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeStocks(tickers);
      setAnalysis(result.analysis);
      toast.success("Analysis completed successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Stock Analysis Tool
          </h1>
          <p className="text-lg text-gray-600">
            Get AI-powered market sentiment and risk analysis for your favorite
            stocks
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Use this tool without logging in | Analyze up to 3 stocks | Powered
            by Google Gemini
          </p>
        </div>

        <div className="space-y-8">
          <StockAnalysisForm
            onSubmit={handleAnalyzeStocks}
            isLoading={isLoading}
          />
          <AnalysisResult
            analysis={analysis}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {!analysis && !isLoading && !error && (
          <div className="w-full max-w-2xl mx-auto p-6 mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                How it works
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-2xl mr-4">1.</span>
                  <span>
                    <strong>Search and Add Stocks:</strong> Find companies by
                    name or ticker and add up to 3 to your analysis list
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-4">2.</span>
                  <span>
                    <strong>Click Analyze:</strong> Our AI analyzes current
                    market sentiment and key risks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-4">3.</span>
                  <span>
                    <strong>Get Insights:</strong> Receive a concise summary of
                    each stock's outlook
                  </span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-6">
                This analysis is for informational purposes only and should not
                be considered financial advice. Always do your own due diligence
                before making investment decisions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAnalysisPage;
