import { createCartResolver } from "./resolvers.js";
import { Cart, CreateCartInput } from "./types.js";
import _ from "lodash";

const createCart = {
  type: Cart,
  args: {
    cart: { type: CreateCartInput },
  },
  resolve: createCartResolver,
};

//commit test
const mutations = _.merge({ createCart });

export const cartMutations = {
  name: "Mutation",
  fields: mutations,
};
