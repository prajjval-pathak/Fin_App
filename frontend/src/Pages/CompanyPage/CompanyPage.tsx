import React, { useEffect, useState } from "react";
import { CompanyProfile } from "../../CompanyTypes";
import { useParams } from "react-router";
import { getCompanyProfile } from "../../api";
import SideBar from "../../Components/SideBar/SideBar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";

interface Props {}

const CompanyPage = (props: Props) => {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>();
  let { ticker } = useParams();
  useEffect(() => {
    const companyProfileinit = async () => {
      const apiRes = await getCompanyProfile(ticker!);
      if (typeof apiRes !== "string") {
        setCompanyProfile(apiRes?.data[0]);
      }
    };

    companyProfileinit();
  }, []);

  return (
    <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
      <SideBar />
      <CompanyDashboard ticker={ticker!}>
        <Tile title="Company Name" subTitle={companyProfile?.companyName} />
        <Tile
          title="Company Price"
          subTitle={companyProfile?.price.toString()}
        />
        <Tile title="Sector" subTitle={companyProfile?.sector} />
        <p className="bg-white rounded-lg text-medium text-gray-900 p-3 mr-3 mt-1 mb-6 shadow-lg">
          {companyProfile?.description}{" "}
        </p>
      </CompanyDashboard>
    </div>
  );
};
export default CompanyPage;
