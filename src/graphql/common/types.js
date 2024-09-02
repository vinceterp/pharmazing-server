import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
export const InputHours = new GraphQLList(
  new GraphQLInputObjectType({
    name: "CreateHours",
    fields: {
      day: { type: GraphQLString },
      open: { type: GraphQLString },
      close: { type: GraphQLString },
    },
  }),
);

export const InputMedia = new GraphQLList(
  new GraphQLInputObjectType({
    name: "CreateMedia",
    fields: {
      type: { type: GraphQLString },
      url: { type: GraphQLString },
      alt: { type: GraphQLString },
    },
  }),
);

export const Media = new GraphQLObjectType({
  name: "Media",
  fields: {
    alt: { type: GraphQLString },
    type: { type: GraphQLString },
    url: { type: GraphQLString },
  },
});

export const Hours = new GraphQLObjectType({
  name: "Hours",
  fields: {
    day: { type: GraphQLString },
    open: { type: GraphQLString },
    close: { type: GraphQLString },
  },
});
