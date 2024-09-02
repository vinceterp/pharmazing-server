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
import { InputHours, InputMedia, Hours, Media } from "../../common/types.js";
export const Vendor = new GraphQLObjectType({
  name: "Vendor",
  fields: {
    vendorId: { type: GraphQLString },
    vendorName: { type: GraphQLString },
    contact: { type: new GraphQLList(GraphQLString) },
    hours: {
      type: new GraphQLList(Hours),
    },
    media: {
      type: new GraphQLList(Media),
    },
    location: { type: Address },
  },
});

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
