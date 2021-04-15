import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    min-height: 100px;
    padding: 10px;
    margin: 5px 0;
    border-radius: 8px;
    background-color: #231f20;
`;
const ImageContainer = styled.div`
    margin-bottom: 5px;
    clear: both;
`;
const Image = styled.div`
    border-radius: 50%;
    width: 3em;
    height: 3em;
    float: left;
    background-image: url(${props => props.bgUrl});
    background-size: contain;
    background-position: center;
    background-color: white;
`;
const Name = styled.span`
    line-height: 1.8;
`;
const InfoContainer = styled.div`
    padding-left: 4em;
`;
const Content = styled.p`
    line-height: 1.4;
    word-break: break-all;
    color: #999;
`;

const Review = ({author, author_details: {avatar_path, user_name}, content, created_at, url}) => 
    <Container>
        <ImageContainer>
                <Image bgUrl={avatar_path ? avatar_path.slice(1) : require("../assets/no_image.jpg").default} />
        </ImageContainer>
        <InfoContainer>
            <Name>{author}</Name>
            <Content>{content.substring(0, 100)}..</Content>
            <a href={url} target="_blank">read more...</a>
        </InfoContainer>
    </Container>

Review.propTypes = {
    author: PropTypes.string,
    author_details: PropTypes.shape({
        avatar_path: PropTypes.string,
        username: PropTypes.string,
    }),
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    url: PropTypes.string,
}

export default Review;