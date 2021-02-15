const { log } = require("console");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");
const { resolve } = require("path");

const RestaurantModel = require("../models/restaurant");
const ReviewModel = require("../models/review");

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
    /* Resolver쪽에서 average rating 만들기 !
    우선 review모델을 가져온 다음, map()으로 각각의 rating을 넣은 array를 만든다.
    그 다음 array 길이가 얼마이든 상관없이 싹 다 더하는 loop를 만든다.
    그 다음 review모델의 length 즉 리뷰 갯수로 나눠주면 끝.  */
    averageRating: {
      // 소수점까지 들어가야 하기 떄문에 Float ! Int로 하면 아예 null값이 떠버린다.
      type: GraphQLFloat,
      async resolve(parent, args) {
        const foundReviews = await ReviewModel.find({
          restaurantId: parent.id,
        });

        /* error : 리뷰가 없는 경우
        Float cannot represent non numeric value: NaN
        그래서 아예 리뷰 array의 길이가 0일 때 0을 return해버린다. 조잡하다.  */
        if (foundReviews.length === 0) {
          return 0;
        }

        const ratingArr = foundReviews.map((v) => v.rating);
        console.log(ratingArr);

        let sum = 0;
        for (let i = 0; i < ratingArr.length; i++) {
          sum += parseInt(ratingArr[i], 10);
        }
        const avgRating = sum / foundReviews.length;
        console.log(avgRating);

        return avgRating;
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
    deleteRestaurant: {
      type: RestaurantType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      /* ! : async & await이 없으면 DB에 접근을 하다 말고 쓸데없는
      함수를 내뱉는다. 값이 나올 떄까지 기다려줘야 함. */
      async resolve(parent, args) {
        const restaurant = await RestaurantModel.findById(args.id);
        if (restaurant) {
          return restaurant.delete();
        } else {
          // graphQL의 Error들은 차근차근 배우자..
          throw new Error("restaurant not found👿");
        }
      },
    },
    updateRestaurant: {
      type: RestaurantType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        priceRange: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        /* ! : ifelse로는 매번 써줘야되서 귀찮다. trycatch가 답. */
        try {
          const restaurant = await RestaurantModel.findOneAndUpdate(
            { _id: args.id },
            {
              name: args.name,
              location: args.location,
              priceRange: args.priceRange,
            }
          );
          /* ? : 어떻게 업데이트된 data를 return하지? 지금은 findOne()의
          결과만 나온다. DB도 잘 바뀌는데. */
          console.log(restaurant);
          return restaurant;
        } catch (e) {
          throw new Error(e);
        }
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
