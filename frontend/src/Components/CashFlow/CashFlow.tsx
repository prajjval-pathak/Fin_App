import React, { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../CompanyTypes";
import { useOutletContext } from "react-router";
import { getCashFlowStatement } from "../../api";
import RatioList from "../RatioList/RatioList";
import Table from "../Table/Table";

type Props = {};
const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedForInvestingActivites,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) => company.commonStockIssued,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
  },
];
const CashFlow = (props: Props) => {
  const [cashflow, setCashFlow] = useState<CompanyCashFlow[] | null>();
  const ticker: string = useOutletContext();
  useEffect(() => {
    const getFlow = async () => {
      const res = await getCashFlowStatement(ticker);
      setCashFlow(res?.data);
    };
    getFlow();
  }, []);
  return (
    <>
      {cashflow ? (
        <>
          <Table configs={config} data={cashflow} />
        </>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
};

export default CashFlow;
