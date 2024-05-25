import { AddressErrorMessage } from "../../../utils/enums.js";

const addresses = [
  {
    userId: "1234567890",
    addressId: "1",
    primary: true,
    addressLine1: "123 Main Street",
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

export const addressResolver = (parent) => {
  try {
    if (!addresses) throw new Error(AddressErrorMessage.NOT_FOUND);
    const userAddresses = addresses.filter(
      (address) => address.userId === parent.userId,
    );
    return userAddresses;
  } catch {
    return [];
  }
};
