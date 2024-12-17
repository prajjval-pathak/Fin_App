import React, { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../CompanyTypes";
import { getIncomeStatement } from "../../api";
import { useOutletContext } from "react-router";
import { handleError } from "../../ErrorHandler/ErrorHandler";
import Table from "../Table/Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Props = {};
const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      company.depreciationAndAmortization,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => company.netIncome,
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) => company.netIncomeRatio,
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => company.eps,
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => company.epsdiluted,
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) => company.grossProfitRatio,
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) => company.operatingIncomeRatio,
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTaxRatio,
  },
];

const IncomeStatement = (props: Props) => {
  const [incomeStatement, setIncomeStatement] = useState<
    CompanyIncomeStatement[] | null
  >();
  const ticker: string = useOutletContext();
  let component:string="income-statement"
  useEffect(() => {
    try {
      const getInc = async () => {
        const res = await getIncomeStatement(ticker!);
        if (res?.data) {
          setIncomeStatement(res.data);
        }
      };
      getInc();
    } catch (error) {
      handleError(error);
    }
  }, []);
  return (
    <>
      {incomeStatement ? (
        <Table component={component}configs={configs} data={incomeStatement} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
export default IncomeStatement;
