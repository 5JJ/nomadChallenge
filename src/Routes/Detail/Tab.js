import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductionTab from "./Tabs/Production";
import VideosTab from "./Tabs/Videos";
import SeasonsTab from "./Tabs/Seasons";
import TabContainer from "Components/Tab";

// const TabContainer = styled.div`
//   margin-top: 23px;
// `;
const Tabs = styled.ul`
  display: flex;
`;
const Tab = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? "bold" : "400")};
  color: ${(props) => (props.selected ? "white" : "#999")};
  border-bottom: ${(props) =>
    props.selected ? "2px solid" : "1px solid #999"};
`;
const TabContent = styled.div`
  padding: 20px 10px;
  min-height: 30vh;
`;

const TabComponent = (result) => {
  return (
    <TabContainer>
      <Tab title="Video">
        <VideosTab videos={result.videos && result.videos.results} />
      </Tab>
      <Tab title="Production">
        <ProductionTab companies={result.production_companies} />
      </Tab>
      {!result.isMovie && (
        <Tab title="Seasons">
          <SeasonsTab seasons={result.seasons} />
        </Tab>
      )}
    </TabContainer>
  );
};

TabComponent.propTypes = {
  result: PropTypes.shape({
    name: PropTypes.string.isRequired,
    overview: PropTypes.string,
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        original_title: PropTypes.string,
        overview: PropTypes.string,
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
      })
    ).isRequired,
  }),
};
export default TabComponent;
