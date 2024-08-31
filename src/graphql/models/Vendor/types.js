import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import {
  Address,
  CreateAddressInputType,
  EditAddressInput,
} from "../Address/types.js";

export const Vendor = new GraphQLObjectType({
  name: "Vendor",
  fields: {
    vendorId: { type: GraphQLString },
    vendorName: { type: GraphQLString },
    //    products: {type: new GraphQLList(Product)}
    contact: { type: new GraphQLList(GraphQLString) },
    hours: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Hours",
          fields: {
            day: { type: GraphQLString },
            open: { type: GraphQLString },
            close: { type: GraphQLString },
          },
        }),
      ),
    },
    media: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Media",
          fields: {
            alt: { type: GraphQLString },
            type: { type: GraphQLString },
            url: { type: GraphQLString },
          },
        }),
      ),
    },
    location: { type: Address },
  },
});

const InputHours = new GraphQLList(
  new GraphQLInputObjectType({
    name: "CreateHours",
    fields: {
      day: { type: GraphQLString },
      open: { type: GraphQLString },
      close: { type: GraphQLString },
    },
  }),
);

const InputMedia = new GraphQLList(
  new GraphQLInputObjectType({
    name: "CreateMedia",
    fields: {
      type: { type: GraphQLString },
      url: { type: GraphQLString },
      alt: { type: GraphQLString },
    },
  }),
);

export const CreateVendorInput = new GraphQLInputObjectType({
  name: "CreateVendorInput",
  fields: {
    vendorName: { type: new GraphQLNonNull(GraphQLString) },
    contact: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
    },
    hours: {
      type: new GraphQLNonNull(InputHours),
    },
    media: {
      type: new GraphQLNonNull(InputMedia),
    },
    location: { type: new GraphQLNonNull(CreateAddressInputType) },
  },
});

export const EditVendorInput = new GraphQLInputObjectType({
  name: "EditVendorInput",
  fields: {
    vendorId: { type: new GraphQLNonNull(GraphQLString) },
    vendorName: { type: GraphQLString },
    contact: { type: new GraphQLList(GraphQLString) },
    hours: {
      type: InputHours,
    },
    media: {
      type: InputMedia,
    },
    location: { type: EditAddressInput },
  },
});

export const DeleteVendorInput = new GraphQLInputObjectType({
  name: "DeleteVendorInput",
  fields: {
    vendorId: { type: GraphQLString },
  },
});

export const DeleteVendorResult = new GraphQLObjectType({
  name: "DeleteVendorResult",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});
