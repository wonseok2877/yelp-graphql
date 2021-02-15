import gql from "graphql-tag";

/* ? : 왜 여기서 또 non nullable으로 하지 ? graphQL schema도 그렇고
DB에서도 non nullable을 했는데. 프론트에서 한 번 더 validation을 하는건가.
굳이 필요 없는 거 아냐 ?
$ : graphQL에서 인식하는 이름앞에다가 붙여준다. 문법인듯 ?
? : 항상 argument가 필요할 때마다 Query문을 한 번씩 더 쓴다. 이건 뭔...? 
$name이 아닌 그냥 name은 javascript에서 인식하고 갖고 놀 변수. */
export const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant(
    $name: String!
    $location: String!
    $priceRange: Int!
  ) {
    createRestaurant(
      name: $name
      location: $location
      priceRange: $priceRange
    ) {
      id
      name
      location
      priceRange
    }
  }
`;

export const DELETE_RESTAURANT_MUTATION = gql`
  mutation deleteRestaurant($id: ID!) {
    deleteRestaurant(id: $id) {
      id
      name
      location
      priceRange
    }
  }
`;

export const UPDATE_RESTAURANT_MUTATION = gql`
  mutation updateRestaurant(
    $id: ID!
    $name: String!
    $location: String!
    $priceRange: Int!
  ) {
    updateRestaurant(
      id: $id
      name: $name
      location: $location
      priceRange: $priceRange
    ) {
      id
      name
      location
      priceRange
    }
  }
`;

export const CREATE_REVIEW_MUTATION = gql`
  mutation createReview(
    $username: String!
    $content: String!
    $rating: Int!
    $restaurantId: ID!
  ) {
    createReview(
      username: $username
      content: $content
      rating: $rating
      restaurantId: $restaurantId
    ) {
      id
      username
      content
      rating
      restaurant {
        name
        location
        priceRange
        reviews {
          content
        }
      }
    }
  }
`;
