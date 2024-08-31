import {
  Vendor,
  CreateVendorInput,
  EditVendorInput,
  DeleteVendorInput,
  DeleteVendorResult,
} from "./types.js";
import {
  createVendorResolver,
  editVendorResolver,
  deleteVendorResolver,
} from "./resolvers.js";
import _ from "lodash";

const createVendor = {
  type: Vendor,
  args: { vendor: { type: CreateVendorInput } },
  resolve: createVendorResolver,
};

const editVendor = {
  type: Vendor,
  args: { vendor: { type: EditVendorInput } },
  resolve: editVendorResolver,
};

const deleteVendor = {
  type: DeleteVendorResult,
  args: { vendor: { type: DeleteVendorInput } },
  resolve: deleteVendorResolver,
};

const mutations = _.merge({ createVendor }, { editVendor }, { deleteVendor });

export const vendorMutations = {
  name: "Mutation",
  fields: mutations,
};
