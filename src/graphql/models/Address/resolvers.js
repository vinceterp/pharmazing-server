import { GraphQLError } from "graphql";
import { AddressErrorMessage, UserErrorMessage } from "../../../utils/enums.js";
import _ from "lodash";

import { Address } from "../../../db/models/Address.js";
import { User } from "../../../db/models/User.js";

export const addressQueryResolver = async (checkAddress, _parent, args) => {
  try {
    const { userId } = args;
    const userAddresses = await Address.find({ userId });
    if (!userAddresses.length && checkAddress)
      throw new GraphQLError(AddressErrorMessage.NOT_FOUND);
    return userAddresses;
  } catch (e) {
    return e;
  }
};

export const addressFieldResolver = async (parent) => {
  try {
    const { userId } = parent;
    const userAddresses = await Address.find({ userId });
    if (!userAddresses.length)
      throw new GraphQLError(AddressErrorMessage.NOT_FOUND);
    return userAddresses;
  } catch (e) {
    return e;
  }
};

export const createAddressResolver = async (
  checkAddress,
  checkUserId,
  _parent,
  args,
) => {
  try {
    const { userId, address } = args;
    const [userFound] = await User.find({ userId });
    if (!userFound && checkUserId)
      throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    const userAddresses = await addressQueryResolver(checkAddress, null, {
      userId,
    });
    _.isArray(userAddresses) &&
      userAddresses?.forEach((userAddress) => {
        const { addressId, __v, _id, createdAt, updatedAt, ...rest } =
          userAddress.toObject();
        if (_.isEqual(rest, { userId, ...address })) {
          throw new GraphQLError(AddressErrorMessage.ALREADY_EXISTS);
        }
      });
    //if primary is true, set all other addresses primary to false
    const newAddress = new Address({
      userId,
      ...address,
    });
    await newAddress.save({ safe: true });
    const { __v, createdAt, updatedAt, _id, __typename, ...rest } =
      newAddress.toObject();
    return rest;
  } catch (e) {
    return e;
  }
};

export const editAddressResolver = async (_root, args) => {
  try {
    const { userId, address } = args;
    const {
      addressId,
      addressLine1,
      addressLine2,
      primary,
      city,
      parish,
      country,
      zip,
      latitude,
      longitude,
    } = address;
    if (!addressId)
      throw new GraphQLError(AddressErrorMessage.MISSING_ADDRESS_ID);
    const [addressIndex] = await Address.find({ addressId });
    if (!addressIndex) throw new GraphQLError(AddressErrorMessage.NOT_FOUND);
    addressIndex.addressLine1 = addressLine1 || addressIndex.addressLine1;
    addressIndex.addressLine2 = addressLine2 || addressIndex.addressLine2;
    addressIndex.primary = primary || addressIndex.primary;
    addressIndex.city = city || addressIndex.city;
    addressIndex.parish = parish || addressIndex.parish;
    addressIndex.country = country || addressIndex.country;
    addressIndex.zip = zip || addressIndex.zip;
    addressIndex.latitude = latitude || addressIndex.latitude;
    addressIndex.longitude = longitude || addressIndex.longitude;
    await addressIndex.save({ safe: true });
    const { __v, createdAt, updatedAt, _id, ...rest } = addressIndex.toObject();
    return rest;
  } catch (e) {
    return e;
  }
};

export const deleteAddressResolver = async (_root, args) => {
  try {
    // throw new GraphQLError("Not implemented");
    const { userId, addressId } = args;
    const addressFound = await Address.findOne({ addressId, userId });
    if (!addressFound) throw new GraphQLError(AddressErrorMessage.NOT_FOUND);
    const { deletedCount, acknowledged } = await addressFound.deleteOne();
    return { success: deletedCount > 0 || acknowledged };
  } catch (e) {
    return e;
  }
};
