import { createCartResolver, editCartResolver } from "./resolvers.js";
import { Cart, CreateCartInput, EditCartInput } from "./types.js";
import _ from "lodash";

const createCart = {
  type: Cart,
  args: {
    cart: { type: CreateCartInput },
  },
  resolve: createCartResolver,
};

const editCart = {
  type: Cart,
  args: {
    cart: { type: EditCartInput },
  },
  resolve: editCartResolver,
};

//commit test
const mutations = _.merge({ createCart }, { editCart });

export const cartMutations = {
  name: "Mutation",
  fields: mutations,
};
