import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductionTab from "./Tabs/Production";
import VideosTab from "./Tabs/Videos";
import SeasonsTab from "./Tabs/Seasons";

const TabContainer = styled.div`
    margin-top: 23px;
`;
const TabList = styled.ul`
    display: flex;
`;
const Tab = styled.li`
    padding: 10px 20px;
    cursor: pointer;
    font-weight: ${props => props.selected ? 'bold' : '400'};
    color: ${props => props.selected ? 'white' : '#999'};
    border-bottom: ${props => props.selected ? '2px solid' : 'none'};
`;
const TabContent = styled.div`
    padding: 20px 10px;
    min-height: 30vh;
`;

const TabComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return {activeIndex, setActiveIndex};
}

export default (result) => {
    const {activeIndex, setActiveIndex} = TabComponent();
    
    return (
        <TabContainer>
            <TabList>
                <Tab onClick={() => setActiveIndex(0)} selected={activeIndex === 0}>Video</Tab>
                <Tab onClick={() => setActiveIndex(1)} selected={activeIndex === 1}>Production</Tab>
                {!result.isMovie && <Tab onClick={() => setActiveIndex(2)} selected={activeIndex === 2}>Seasons</Tab>}
            </TabList>
            <TabContent>
                {activeIndex == 0 && <VideosTab videos={result.videos && result.videos.results} />}
                {activeIndex == 1 && <ProductionTab companies={result.production_companies} />}
                {activeIndex == 2 && <SeasonsTab seasons={result.seasons} />}
            </TabContent>
        </TabContainer>
    )
}
