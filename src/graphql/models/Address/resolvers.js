import { GraphQLError } from "graphql";
import { AddressErrorMessage, UserErrorMessage } from "../../../utils/enums.js";
import { users } from "../User/resolvers.js";
import _ from "lodash";

const addresses = [
  {
    userId: "1234567890",
    addressId: "1",
    primary: true,
    addressLine1: "123 Main Street",
    addressLine2: "Apt 1",
    city: "Kingston",
    parish: "St. Andrew",
    country: "Jamaica",
    zip: "12345",
  },
  {
    userId: "1234560",
    addressId: "2",
    primary: true,
    addressLine1: "123 Master Street",
    city: "St. James",
    parish: "St. Andrew",
    country: "Jamaica",
    zip: "12325",
  },
];

export const addressQueryResolver = (checkAddress, _parent, args) => {
  try {
    const { userId } = args;
    const userAddresses = addresses.filter(
      (address) => address.userId === userId,
    );
    if (!userAddresses.length && checkAddress)
      throw new GraphQLError(AddressErrorMessage.NOT_FOUND);
    return userAddresses;
  } catch (e) {
    return e;
  }
};

export const addressFieldResolver = (parent) => {
  try {
    const { userId } = parent;
    const userAddresses = addresses.filter(
      (address) => address.userId === userId,
    );
    if (!userAddresses.length)
      throw new GraphQLError(AddressErrorMessage.NOT_FOUND);
    return userAddresses;
  } catch (e) {
    return e;
  }
};

export const createAddressResolver = (
  checkAddress,
  checkUserId,
  _parent,
  args,
) => {
  try {
    const { userId, address } = args;
    const userFound = users.findIndex((user) => user.userId === userId);
    if (userFound === -1 && checkUserId)
      throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    const userAddresses = addressQueryResolver(checkAddress, null, { userId });
    userAddresses.forEach((userAddress) => {
      const { addressId, ...rest } = userAddress;
      if (_.isEqual(rest, { userId, ...address })) {
        throw new GraphQLError(AddressErrorMessage.ALREADY_EXISTS);
      }
    });
    const addressId = Math.floor(Math.random() * 10000000);
    const newAddress = {
      userId,
      addressId,
      ...address,
    };
    addresses.push(newAddress);
    return newAddress;
  } catch (e) {
    return e;
  }
};
