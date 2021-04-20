import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NoResult from "../NoResult";

const SeasonsList = styled.ul``;
const Season = styled.li`
  padding: 15px 0 30px;
  position: relative;
  display: flex;
`;
const Image = styled.div`
  border-radius: 4px;
  width: 200px;
  height: 180px;
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const ImageContainer = styled.div``;
const InfoConatiner = styled.div`
  width: 100%;
`;
const AirDate = styled.span`
  font-weight: 600;
`;
const Name = styled.span``;
const Overview = styled.p`
  margin: 10px 0;
  padding: 0 10px 0 0;
  line-height: 1.3;
  white-space: pre-wrap;
  color: #999;
`;
const Tag = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #231f20;
  padding: 4px 8px;
  font-weight: 600;
`;
const ExtraInfo = styled.div`
  border-top: 1px solid rgb(220 220 220 / 20%);
  padding-top: 10px;
`;
const SeasonsTab = ({ seasons }) =>
  seasons && seasons.length > 0 ? (
    <SeasonsList>
      {seasons
        .sort((a, b) => a.season_number - b.season_number)
        .map((season) => (
          <Season key={season.id}>
            <Tag>{`Season ${season.season_number}`}</Tag>
            <ImageContainer>
              <Image
                bgUrl={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                    : require("../../assets/no_image.jpg").default
                }
              />
            </ImageContainer>
            <InfoConatiner>
              <AirDate>
                {season.air_date ? season.air_date.substring(0, 4) : "Not Air"}
              </AirDate>
              <Overview title={season.overview}>{season.overview}</Overview>
              <ExtraInfo>
                <span>{`Total Episodes: ${season.episode_count}`}</span>
              </ExtraInfo>
            </InfoConatiner>
          </Season>
        ))}
    </SeasonsList>
  ) : (
    <NoResult />
  );

SeasonsTab.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      air_date: PropTypes.string,
      episode_count: PropTypes.number,
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      season_number: PropTypes.number,
    })
  ),
};

export default SeasonsTab;
