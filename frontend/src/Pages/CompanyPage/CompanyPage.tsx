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
      </CompanyDashboard>
    </div>
  );
};
export default CompanyPage;
