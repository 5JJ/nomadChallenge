import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Message from "./Message";
import Review from "./Review";

const Container = styled.div`
    padding: 10px;
    margin-top: 15px;
    background-color: rgba(20,20,20, 0.6);
`;
const List = styled.ul``;
const Title = styled.h3`
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
`;
const ReviewList = ({reviews}) => (
    <Container>
        <Title>Reviews</Title>
        {
            !reviews ?
                <Message text="Loading Failed" />
                :
                <List>
                    {
                        reviews.length > 0 ? reviews.map(review => 
                            <Review key={review.id} {...review} /> )
                            :
                            <Message text="No result" />
                    }
                </List>
        }
    </Container>
)

ReviewList.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            author: PropTypes.string,
            author_details: PropTypes.shape({
                avatar_path: PropTypes.string,
                username: PropTypes.string,
            }),
            content: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
        })
    )
}

export default ReviewList;
