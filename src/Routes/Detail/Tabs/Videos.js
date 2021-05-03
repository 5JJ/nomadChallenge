import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NoResult from "../../../Components/NoResult";

const VideoList = styled.div`
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Video = styled.iframe`
  background-color: #231f20;
`;
const Type = styled.span`
  font-weight: 600;
  line-height: 1.8;
  color: #ddd;
`;
const VideoContainer = styled.div`
  width: 300px;
  margin-right: 20px;
  text-align: center;
`;

const VideosTab = ({ videos }) => {
  videos = videos && videos.filter((video) => video.site === "YouTube");
  return videos.length > 0 ? (
    <VideoList>
      {videos
        .filter((video) => video.site === "YouTube")
        .map((video) => (
          <VideoContainer key={video.id}>
            <Video
              width="300"
              height="200"
              frameborder="0"
              src={`https://www.youtube.com/embed/${video.key}`}
              loading="lazy"
              key={video.key}
            >
              Loading
            </Video>
            <Type>{`[ ${video.type} ]`}</Type>
          </VideoContainer>
        ))}
    </VideoList>
  ) : (
    <NoResult />
  );
};

VideosTab.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      key: PropTypes.string.isRequired,
      site: PropTypes.string,
    })
  ),
};

export default VideosTab;
