const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const RestaurantModel = require("../models/restaurant");
const ReviewModel = require("../models/review");

let dummyRestaurants = [
  { name: "famous mother fucker", location: "Seoul", priceRange: 1, id: "1" },
  { name: "lazy mother fucker", location: "Seoul", priceRange: 2, id: "2" },
  { name: "nice mother fucker", location: "Seoul", priceRange: 5, id: "3" },
  { name: "monk mother fucker", location: "LA", priceRange: 3, id: "4" },
  {
    name: "beautiful mother fucker",
    location: "madagascar",
    priceRange: 4,
    id: "5",
  },
  { name: "just a mother fucker", location: "ass", priceRange: 4, id: "6" },
];

let dummyReviews = [
  { username: "john", content: "nice~", rating: 5, id: "1", restaurantId: "6" },
  {
    username: "lanny",
    content: "nice~",
    rating: 4,
    id: "2",
    restaurantId: "5",
  },
  {
    username: "cupper",
    content: "nice~",
    rating: 1,
    id: "3",
    restaurantId: "4",
  },
  {
    username: "pinkguy",
    content: "sucks",
    rating: 3,
    id: "4",
    restaurantId: "1",
  },
  {
    username: "blackguy",
    content: "wonderful",
    rating: 1,
    id: "7",
    restaurantId: "1",
  },
  {
    username: "rainbowguy",
    content: "joyful",
    rating: 5,
    id: "8",
    restaurantId: "1",
  },
  {
    username: "blueguy",
    content: "noice",
    rating: 5,
    id: "9",
    restaurantId: "1",
  },
  { username: "a", content: "fuck you", rating: 4, id: "5", restaurantId: "1" },
  {
    username: "just a mother fucker",
    content: "suck my dick",
    rating: 4,
    id: "6",
    restaurantId: "2",
  },
];

const RestaurantType = new GraphQLObjectType({
  name: "aRestaurant",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    priceRange: { type: GraphQLInt },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        // return dummyReviews.filter((v) => v.restaurantId === parent.id);
        return ReviewModel.find({ restaurantId: parent.id });
      },
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "aReview",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    content: { type: GraphQLString },
    rating: { type: GraphQLInt },
    restaurant: {
      type: RestaurantType,
      resolve(parent, args) {
        // return dummyRestaurants.find((r) => r.id === parent.id);
        return RestaurantModel.findById(parent.restaurantId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getRestaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return dummyRestaurants.find((r) => r.id === args.id);
        return RestaurantModel.findById(args.id);
      },
    },
    getReview: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return dummyReviews.find((v) => v.id === args.id);
        return ReviewModel.findById(args.id);
      },
    },
    getAllRestaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        // return dummyRestaurants;
        return RestaurantModel.find({});
      },
    },
    getAllReviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        // return dummyReviews;
        return ReviewModel.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        priceRange: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const restaurant = new RestaurantModel({
          name: args.name,
          location: args.location,
          priceRange: args.priceRange,
        });
        return restaurant.save();
      },
    },
    createReview: {
      type: ReviewType,
      args: {
        username: { type: GraphQLString },
        content: { type: GraphQLString },
        rating: { type: GraphQLInt },
        restaurantId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const review = new ReviewModel({
          username: args.username,
          content: args.content,
          rating: args.rating,
          restaurantId: args.restaurantId,
        });
        return review.save();
      },
    },
  },
});

const scheeeema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = scheeeema;
