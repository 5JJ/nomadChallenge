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
const TabListItem = styled.li`
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
const Tab = (result) => {
    const {activeIndex, setActiveIndex} = TabComponent();
    
    return (
        <TabContainer>
            <TabList>
                <TabListItem onClick={() => setActiveIndex(0)} selected={activeIndex === 0}>Video</TabListItem>
                <TabListItem onClick={() => setActiveIndex(1)} selected={activeIndex === 1}>Production</TabListItem>
                {!result.isMovie && <TabListItem onClick={() => setActiveIndex(2)} selected={activeIndex === 2}>Seasons</TabListItem>}
            </TabList>
            <TabContent>
                {activeIndex == 0 && <VideosTab videos={result.videos && result.videos.results} />}
                {activeIndex == 1 && <ProductionTab companies={result.production_companies} />}
                {activeIndex == 2 && <SeasonsTab seasons={result.seasons} />}
            </TabContent>
        </TabContainer>
    )
}

Tab.propTypes = {
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
    })
}
export default Tab;