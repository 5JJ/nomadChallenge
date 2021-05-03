import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NoResult from "../../../Components/NoResult";
import { companyApi } from "api";
import Message from "Components/Message";

const CompanyList = styled.ul``;
const Company = styled.li`
  padding: 15px 10px;
  display: flex;
  align-items: start;
  white-space: pre-wrap;
  word-break: break-all;

  &:not(&:last-child) {
    border-bottom: 1px solid rgb(63 62 62 / 82%);
  }
`;
const LogoBox = styled.div`
  margin-right: 10px;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
`;
const Logo = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.bgImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const Name = styled.span`
  text-transform: uppercase;
  font-weight: bold;
`;
const Country = styled.span`
  margin-left: 10px;
`;

const CountryIcons = {
  JP: "🇯🇵",
  US: "🇺🇸",
  AU: "🇦🇺",
  BE: "🇧🇪",
  DE: "🇩🇪",
  CA: "🇨🇦",
  KR: "🇰🇷",
};

const InfoContainer = styled.div`
  width: 100%;
`;

const DetailInfo = styled.dl`
  clear: both;
  line-height: 1.6;
  color: #999;

  &:first-child {
    margin-top: 12px;
  }
`;
const DetailTitle = styled.dt`
  float: left;
  line-height: 1.3;
  margin-right: 3px;
  font-weight: bold;
`;

const LoadingFailed = styled(Message)`
  &&& {
    width: 100%;
    margin-top: 10px;
    justify-content: left;
  }
`;

const CompanyDetail = (companyIds) => {
  const [detailList, setDetailList] = useState({});
  const companyIdsCopied = [...companyIds];
  const getCompanyDetail = async () => {
    for (const id of companyIdsCopied) {
      const newState = {};
      try {
        const { data } = await companyApi.getDetail(id);
        newState[id.toString()] = data;
        setDetailList((prevState) => ({ ...prevState, ...newState }));
      } catch (error) {
        newState[id.toString()] = "Loading Failed";
        setDetailList((prevState) => ({ ...prevState, ...newState }));
      } finally {
      }
    }
  };
  useEffect(() => {
    getCompanyDetail();
    return () => {
      console.log("bye");
    };
  }, []);
  return detailList;
};

const ProductionTab = ({ companies }) => {
  const detailList = CompanyDetail(companies.map((company) => company.id));
  return companies && companies.length > 0 ? (
    <CompanyList>
      {companies &&
        companies.map((company, index) => (
          <Company key={index}>
            <LogoBox>
              <Logo
                bgImage={
                  company.logo_path
                    ? `https://image.tmdb.org/t/p/w300${company.logo_path}`
                    : require("../../../assets/no_image.jpg").default
                }
              ></Logo>
            </LogoBox>
            <InfoContainer>
              <Name>{company.name}</Name>
              {company.origin_country && (
                <Country title={company.origin_country}>{`(${
                  CountryIcons[company.origin_country]
                    ? CountryIcons[company.origin_country]
                    : company.origin_country
                })`}</Country>
              )}
              {detailList[company.id.toString()] &&
                (typeof detailList[company.id.toString()] === "object" ? (
                  <div>
                    <DetailInfo>
                      <DetailTitle>Hompage: </DetailTitle>
                      <dd>{detailList[company.id.toString()].homepage}</dd>
                    </DetailInfo>
                    <DetailInfo>
                      <DetailTitle>HQ: </DetailTitle>
                      <dd>{detailList[company.id.toString()].headquarters}</dd>
                    </DetailInfo>
                    <DetailInfo>
                      <DetailTitle>Description: </DetailTitle>
                      <dd>{detailList[company.id.toString()].description}</dd>
                    </DetailInfo>
                  </div>
                ) : (
                  <LoadingFailed text="Loading Failed 🚫" color="#ddd" />
                ))}
            </InfoContainer>
          </Company>
        ))}
    </CompanyList>
  ) : (
    <NoResult />
  );
};

ProductionTab.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      logo_path: PropTypes.string,
      name: PropTypes.string,
      origin_country: PropTypes.string,
    })
  ),
};

export default ProductionTab;
