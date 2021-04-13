import React, {useState} from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import NoResult from "../NoResult";
import {companyApi} from "api";

const Container = styled.div``;
const CompanyList = styled.ul``;
const Company = styled.li`
    padding: 15px 10px;
    display: flex;
    &:not(&:last-child){
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
    background-image: url(${props => props.bgImage});
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
    'JP': '🇯🇵',
    'US': '🇺🇸',
    'AU': '🇦🇺',
    'BE': '🇧🇪',
    'DE': '🇩🇪',
    'CA': '🇨🇦',
    'KR': '🇰🇷',
}
const QuestionIcon = styled.i`
    border-radius: 50%;
    background-color: #999;
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    color: white;
    font-size: 14px;
    cursor: pointer;

    &:hover{
        background-color: #5e5c5c;
    }
`;

const InfoContainer = styled.div`
    width: 100%;
`;
const DetailShowUp = keyframes`
    0% {top: 100%}
    4% {top: 0%}
    33.33% {top: 0%}
    37.33% {top: -100%}
    100% {top: -100%}
`
const DetailInfo = styled.dl`
    clear: both;
    line-height: 1.6;
    color: #999;
`;
const DetailTitle = styled.dt`
    float: left;
    margin-right: 3px;
    font-weight: bold;
`;

const CompanyDetail = () => {
    const [detailList, setDetailList] = useState({})
    const [loading, setLoading] = useState(false);
    const getCompanyDetail = async (id) => {
        try{
            setLoading(true);
            if(!detailList[id.toString()] && !loading){
                const {data} = await companyApi.getDetail(id);
                const newState = {};
                newState[id.toString()] = data;
                setDetailList((prevState) => ({...prevState, ...newState}));
            }
        }catch(error){

        }finally{
            setLoading(false);
        }
    }
    return {detailList, getCompanyDetail, loading}
}

const ProductionTab = ({companies}) => {
    const {detailList, getCompanyDetail, loading} = CompanyDetail();
    return (companies && companies.length > 0 ?
    <CompanyList>
        {companies && companies.map((company, index) => 
        (
        <Company key={index}>
            <LogoBox><Logo bgImage={company.logo_path ? `https://image.tmdb.org/t/p/w300${company.logo_path}` : require("../../assets/no_image.jpg").default}></Logo></LogoBox>
            <InfoContainer>
                <Name>{company.name}</Name>
                {company.origin_country && <Country title={company.origin_country}>{`(${CountryIcons[company.origin_country] ? CountryIcons[company.origin_country] : company.origin_country})`}</Country>}
                <QuestionIcon onClick={(e) => getCompanyDetail(company.id)} disabled={loading} aria-label="more company Info">?</QuestionIcon>
                {detailList[company.id.toString()] && (
                    <div>
                        <DetailInfo><DetailTitle>Hompage: </DetailTitle><dd>{detailList[company.id.toString()].homepage}</dd></DetailInfo>
                        <DetailInfo><DetailTitle>HQ: </DetailTitle><dd>{detailList[company.id.toString()].headquarters}</dd></DetailInfo>
                        <DetailInfo><DetailTitle>Description: </DetailTitle><dd>{detailList[company.id.toString()].description}</dd></DetailInfo>
                    </div>
                )}
            </InfoContainer>
        </Company>))} 
    </CompanyList>
    :
    <NoResult/>
    )
}

ProductionTab.propTypes = {
    companies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            logo_path: PropTypes.string,
            name: PropTypes.string,
            origin_country: PropTypes.string,
        })
    ),
}

export default ProductionTab;

