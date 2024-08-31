import { Vendor } from "../../../db/models/Vendor.js";
import { Address } from "../../../db/models/Address.js";
import { GraphQLError } from "graphql";
import { VendorErrorMessage } from "../../../utils/enums.js";
import { addressFieldResolver } from "../Address/resolvers.js";

export const getAllVendorsResolver = async (_root, _args, _context) => {
  try {
    const vendors = await Vendor.find();
    if (!vendors.length) throw new GraphQLError(VendorErrorMessage.NOT_FOUND);
    return vendors;
  } catch (e) {
    return e;
  }
};

export const createVendorResolver = async (_root, args, _context) => {
  try {
    const { vendor } = args;
    const { vendorName, contact, hours, media, location } = vendor;

    const vendorFound = await Vendor.findOne({ vendorName });

    if (vendorFound) {
      const addresses = await addressFieldResolver({
        userId: vendorFound.vendorId,
      });
      return { ...vendorFound.toObject(), location: addresses?.[0] || null };
    }

    const newVendor = new Vendor({
      vendorName,
      contact,
      hours,
      media,
    });

    const { vendorId } = newVendor;

    if (!vendorId) {
      throw new GraphQLError(VendorErrorMessage.NOT_CREATED);
    }

    const newAddress = new Address({
      ...location,
      primary: true,
      userId: vendorId,
    });

    const address = await newAddress.save();
    const createdVendor = await newVendor.save().catch(async (e) => {
      await newAddress.deleteOne();
      throw new GraphQLError(VendorErrorMessage.NOT_CREATED);
    });

    return { ...createdVendor.toObject(), location: address.toObject() };
  } catch (e) {
    return e;
  }
};

export const editVendorResolver = async (_root, args, _context) => {
  try {
    const { vendor } = args;
    const { vendorId, vendorName, contact, hours, media, location } = vendor;

    if (!vendorId) throw new GraphQLError(VendorErrorMessage.MISSING_VENDOR_ID);

    const vendorFound = await Vendor.findOne({ vendorId });
    if (!vendorFound) throw new GraphQLError(VendorErrorMessage.NOT_FOUND);

    vendorFound.vendorName = vendorName || vendorFound.vendorName;
    vendorFound.contact = contact || vendorFound.contact;
    vendorFound.hours = hours || vendorFound.hours;
    vendorFound.media = media || vendorFound.media;
    await vendorFound.save({ safe: true });

    const addresses = await addressFieldResolver({
      userId: vendorFound.vendorId,
    });
    const address = addresses?.[0];
    if (!address)
      throw new GraphQLError(VendorErrorMessage.ADDRESS_NOT_CREATED);
    for (let prop in location) if (!location[prop]) delete location[prop];
    await Address.findOneAndUpdate(
      { addressId: address.addressId },
      { ...location },
      { safe: true },
    );

    const [raddresses] = await addressFieldResolver({
      userId: vendorFound.vendorId,
    });
    const { createdAt, updatedAt, __v, _id, ...restAddress } =
      raddresses.toObject();
    const { _createdAt, _updatedAt, ___v, __id, ...restVendor } =
      vendorFound.toObject();
    return { ...restVendor, location: restAddress };
  } catch (e) {
    return e;
  }
};

export const deleteVendorResolver = async (_root, args, _context) => {
  try {
    const { vendor } = args;
    const { vendorId } = vendor;
    if (!vendorId) throw new GraphQLError(VendorErrorMessage.MISSING_VENDOR_ID);
    const vendorFound = await Vendor.findOne({ vendorId });
    if (!vendorFound) throw new GraphQLError(VendorErrorMessage.NOT_FOUND);
    const { deletedCount, acknowledged } = await vendorFound.deleteOne();
    return { success: deletedCount > 0 || acknowledged };
  } catch (e) {
    return e;
  }
};
