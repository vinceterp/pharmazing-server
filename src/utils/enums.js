/**
 * Enum for signIn errors.
 * @readonly
 * @enum string
 */
export const UserErrorMessage = Object.freeze({
  NOT_FOUND: "user not found",
  ALREADY_EXISTS: "user already exists",
});

/**
 * Enum for address errors.
 * @readonly
 * @enum string
 */
export const AddressErrorMessage = Object.freeze({
  NOT_FOUND: "address not found",
  ALREADY_EXISTS: "address already exists",
  MISSING_ADDRESS_ID: "missing address id",
});

/**
 * Enum for vendor errors.
 * @readonly
 * @enum string
 */
export const VendorErrorMessage = Object.freeze({
  NOT_FOUND: "vendor not found",
  ALREADY_EXISTS: "vendor already exists",
  NOT_CREATED: "error while creating vendor",
  ADDRESS_NOT_CREATED: "error while creating address",
  MISSING_VENDOR_ID: "missing vendor id",
});

/**
 * Enum for cart errors.
 * @readonly
 * @enum string
 */
export const CartErrorMessage = Object.freeze({
  NOT_FOUND: "cart not found",
  ALREADY_EXISTS: "cart already exists",
});
