import gql from "graphql-tag";

export const GET_RESTAURANTS_QUERY = gql`
  query {
    getAllRestaurants {
      id
      name
      location
      priceRange
      averageRating
    }
  }
`;

export const GET_A_RESTAURANT_QUERY = gql`
  query getRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      location
      priceRange
      reviews {
        id
        username
        content
        rating
      }
    }
  }
`;

export const GET_REVIEWS_QUERY = gql`
  query {
    getAllReviews {
      id
      username
      content
      rating
    }
  }
`;

export const GET_A_REVIEW_QUERY = gql`
  query getReview($id: ID!) {
    getReview(id: $id) {
      id
      username
      content
      rating
      restaurant {
        id
        name
      }
      __typename
    }
  }
`;
