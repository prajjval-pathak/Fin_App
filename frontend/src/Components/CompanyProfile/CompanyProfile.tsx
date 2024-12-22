import React, { useEffect, useState } from "react";
import { CompanyKeyMetrics } from "../../CompanyTypes";
import { getCompanyKeyMetrics } from "../../api";
import { useOutletContext } from "react-router";
import RatioList from "../RatioList/RatioList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import Comments, { CommentsSchema } from "../StockCommentForm/StockCommentForm";
// import { CommentPostApi } from "../../Services/CommentService";
// import { toast } from "react-toastify";
// import StockCommentForm from "../StockCommentForm/StockCommentForm";
import StockComment from "../StockComment/StockComment";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCapTTM,
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => company.roeTTM,
  },
  {
    label: "Cash Per Share",
    render: (company: CompanyKeyMetrics) => company.cashPerShareTTM,
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => company.roeTTM,
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompnayData] = useState<CompanyKeyMetrics>();

  const companyProfile: string = "company-profile";
  useEffect(() => {
    const getCopanyMetrics = async () => {
      const res = await getCompanyKeyMetrics(ticker);
      setCompnayData(res?.data[0]);
    };
    getCopanyMetrics();
  }, []);
  return (
    <>
      {companyData ? (
        <>
          <RatioList
            component={companyProfile}
            config={tableConfig}
            data={companyData}
          />
          <StockComment ticker={ticker} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default CompanyProfile;
