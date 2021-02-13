const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const RestaurantModel = require("../models/restaurant");
const ReviewModel = require("../models/review");

/*  */

const RestaurantType = new GraphQLObjectType({
  name: "aRestaurant",
  fields: () => ({
    // type definitions as GraphQLTypes
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    priceRange: { type: GraphQLInt },
    reviews: {
      // GraphQLList = []
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
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
      // non nullable = !
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return RestaurantModel.findById(args.id);
      },
    },
    getReview: {
      type: ReviewType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return ReviewModel.findById(args.id);
      },
    },
    getAllRestaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return RestaurantModel.find({});
      },
    },
    getAllReviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        priceRange: { type: new GraphQLNonNull(GraphQLInt) },
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
        username: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        rating: { type: new GraphQLNonNull(GraphQLInt) },
        restaurantId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const foundRestaurant = await RestaurantModel.findById(
          args.restaurantId
        );
        console.log(foundRestaurant);
        if (foundRestaurant) {
          console.log("fuck off");
        }
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
