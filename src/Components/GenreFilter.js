import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const GenreTag = styled.span`
  padding: 3px 10px;
  display: inline-block;
  margin: 3px;
  border-radius: 5px;
  border: 1px solid #eee;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "#eee")};
  background-color: ${(props) => (props.selected ? "#999" : "#231f20")};
`;

const GenreFilter = ({ genres, setGenre, genreId }) => {
  return (
    <>
      {genres &&
        [{ id: 0, name: "All" }, ...genres].map((genre) => (
          <GenreTag
            key={genre.id}
            onClick={() => {
              setGenre(genre.id);
            }}
            selected={genreId === genre.id}
          >
            {genre.name}
          </GenreTag>
        ))}
    </>
  );
};

GenreFilter.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedGenreId: PropTypes.number,
  setGenre: PropTypes.func.isRequired,
};

export default GenreFilter;
