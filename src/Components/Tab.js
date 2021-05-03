import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const useTab = (initialIndex, tabs) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return {
    activeIndex,
    setActiveIndex,
    activeTab: tabs[activeIndex].props.children,
  };
};
const TabContainer = ({ children: tabs }) => {
  tabs = tabs.filter((tab) => tab && tab.props && tab.props.children);
  const { activeIndex, setActiveIndex, activeTab } = useTab(0, tabs);

  return (
    <>
      <Tabs>
        {tabs
          .filter((tab) => tab)
          .map(({ props: { title } }, index) => (
            <Tab
              key={index}
              onClick={() => setActiveIndex(index)}
              selected={activeIndex === index}
            >
              {title}
            </Tab>
          ))}
      </Tabs>
      <TabContent>{activeTab}</TabContent>
    </>
  );
};

TabContainer.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
};
export default TabContainer;
