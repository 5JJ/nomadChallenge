import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { withRouter } from "react-router-dom";
import Tab from "Components/Tab";
import Collection from "Components/Collection";
import Helmet from "react-helmet";
import Message from "Components/Message";
import ReviewList from "Components/ReviewList";
import device from "Components/deviceSize";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Cover = styled.div`
  border-radius: 5px;
  height: 50vh;
  //max-height: calc(30vw + 100px);
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

const Data = styled.div`
  margin-left: 10px;
  margin-bottom: 100px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;
const Item = styled.span``;
const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  line-height: 1.8;
  font-size: 12px;
  color: 0.7;
  width: 80%;
`;

const LinkTag = styled.a`
  margin-left: 20px;
  border-radius: 3px;
  padding: 2px 10px;
  display: inline-block;
  line-height: 14px;
  color: #231f20;
  font-weight: bold;
  font-size: 12px;
  background-color: #f0c23a;
`;
const Section = styled.section`
  background-color: rgba(0, 0, 0, 0.6);
`;
const Content = styled.div`
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 30% 70%;
  grid-template-rows: 50vh auto;

  > ${Cover} {
    order: 1;
  }
  > section {
    order: 3;
  }

  > ${Data} {
    order: 2;
    grid-row: 1 / span 2;
    grid-column: 2;
  }

  @media ${({ device }) => device.tablet} {
    grid-template-columns: 100%;

    > ${Data} {
      grid-row: auto;
      grid-column: auto;
      margin-bottom: 0;
    }
  }
`;

const DetailPresenter = withRouter(
  ({
    location: { pathname },
    match: { path },
    result,
    loading,
    error,
    secondIsFetch,
    secondResult,
  }) =>
    loading ? (
      <>
        <Helmet>
          <title>Loading | Namflix</title>
        </Helmet>
        <Loader />
      </>
    ) : error ? (
      <Message text={error} />
    ) : (
      <Container>
        {(result.isMovie = !!result.original_title)}
        <Helmet>
          <title>
            {result.isMovie ? result.original_title : result.original_name} |
            Namflix
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content device={device}>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/no_image.jpg").default
            }
          />
          <section>
            {secondIsFetch && <ReviewList reviews={secondResult} />}
          </section>
          <Data>
            <Title>
              {result.isMovie ? result.original_title : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.isMovie
                  ? result.release_date && result.release_date.substring(0, 4)
                  : result.first_air_date &&
                    result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>·</Divider>
              <Item>
                {result.isMovie ? result.runtime : result.episode_run_time[0]}{" "}
                min
              </Item>
              <Divider>·</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <LinkTag
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
              >
                IMDB ➡
              </LinkTag>
            </ItemContainer>

            <Overview>{result.overview}</Overview>
            <Section>
              {result.belongs_to_collection && (
                <Collection
                  belongs_to_collection={result.belongs_to_collection}
                />
              )}
            </Section>
            <Section>
              <Tab {...result} />
            </Section>
          </Data>
        </Content>
      </Container>
    )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  secondIsFetch: PropTypes.bool.isRequired,
  secondResult: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      author_details: PropTypes.shape({
        avatar_path: PropTypes.string,
        username: PropTypes.string,
      }),
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ),
};

export default DetailPresenter;
