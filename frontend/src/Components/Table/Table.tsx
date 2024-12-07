import React from "react";
import { testIncomeStatementData } from "./TestData";

type Props = { configs: any; data: any };

// const data = testIncomeStatementData;
// type Company = (typeof data)[0];
// const configs = [
//   {
//     label: "Year",
//     render: (company: Company) => company.calendarYear,
//   },
//   {
//     label: "costOfRevenue",
//     render: (company: Company) => company.costOfRevenue,
//   },
// ];

const Table = ({ configs, data }: Props) => {
  const renderRows = data.map((company: any) => {
    return (
      <tr key={company.cik}>
        {configs.map((config: any, idx: any) => (
          <td
            className="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
            key={idx}
          >
            {config.render(company)}
          </td>
        ))}
        {/* // <td className="p-3">{configs[1].render(company)}</td> */}
      </tr>
    );
  });
  const renderHeaders = configs.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">{renderHeaders}</thead>
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
