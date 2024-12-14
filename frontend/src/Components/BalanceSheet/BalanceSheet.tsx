import React, { useEffect, useState } from "react";
import {
  CompanyBalanceSheet,
  CompanyIncomeStatement,
} from "../../CompanyTypes";
import { getBalanceSheet } from "../../api";
import { useOutletContext } from "react-router";
import RatioList from "../RatioList/RatioList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Props = {};
const configs = [
  {
    label: "Total Assets",
    render: (company: CompanyBalanceSheet) => company.totalAssets,
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) => company.intangibleAssets,
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
  },
  {
    label: <div className="font-bold">Total Liabilites</div>,
    render: (company: CompanyBalanceSheet) => company.totalLiabilities,
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) => company.otherLiabilities,
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) => company.retainedEarnings,
  },
];
const BalanceSheet = (props: Props) => {
  const [balanceSheet, setBalanceSheet] =
    useState<CompanyBalanceSheet | null>();
  const ticker: string = useOutletContext();
  useEffect(() => {
    try {
      const getBalance = async () => {
        const res = await getBalanceSheet(ticker!);
        setBalanceSheet(res?.data[0]);
      };
      getBalance();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {balanceSheet ? (
        <>
          <RatioList config={configs} data={balanceSheet} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default BalanceSheet;
