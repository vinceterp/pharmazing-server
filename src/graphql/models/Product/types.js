import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { Media, InputMedia } from "../../common/types.js";

export const Product = new GraphQLObjectType({
  name: "Product",
  fields: {
    productId: { type: GraphQLString },
    vendorId: { type: GraphQLString },
    productName: { type: GraphQLString },
    productDescription: { type: GraphQLString },
    productPrice: { type: GraphQLFloat },
    productCategory: { type: GraphQLString },
    prescriptionRequired: { type: GraphQLBoolean },
    media: { type: new GraphQLList(Media) },
  },
});

export const GetProductInput = new GraphQLInputObjectType({
  name: "GetProductInput",
  fields: {
    productId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const GetAllProductsInput = new GraphQLInputObjectType({
  name: "GetAllProductsInput",
  fields: {
    vendorId: { type: GraphQLString },
    productId: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  },
});

export const DeleteProductInput = new GraphQLInputObjectType({
  name: "DeleteProductInput",
  fields: {
    productId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const CreateProductInput = new GraphQLInputObjectType({
  name: "CreateProductInput",
  fields: {
    vendorId: { type: new GraphQLNonNull(GraphQLString) },
    productName: { type: new GraphQLNonNull(GraphQLString) },
    productDescription: { type: new GraphQLNonNull(GraphQLString) },
    productPrice: { type: new GraphQLNonNull(GraphQLFloat) },
    productCategory: { type: GraphQLString },
    prescriptionRequired: { type: GraphQLBoolean, defaultValue: false },
    media: { type: InputMedia },
  },
});

export const EditProductInput = new GraphQLInputObjectType({
  name: "EditProductInput",
  fields: {
    productId: { type: new GraphQLNonNull(GraphQLString) },
    productName: { type: GraphQLString },
    productDescription: { type: GraphQLString },
    productPrice: { type: GraphQLFloat },
    productCategory: { type: GraphQLString },
    prescriptionRequired: { type: GraphQLBoolean },
    media: { type: new GraphQLList(InputMedia) },
  },
});

export const DeleteProductResult = new GraphQLObjectType({
  name: "DeleteProductResult",
  fields: {
    success: { type: GraphQLBoolean },
  },
});
