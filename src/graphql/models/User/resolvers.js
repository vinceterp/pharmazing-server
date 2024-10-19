/* eslint-disable no-unused-vars */
import { GraphQLError } from "graphql";
import { UserErrorMessage } from "../../../utils/enums.js";

import { verify } from "../../../utils/verify.js";
import { User } from "../../../db/models/User.js";
// import { Cart } from "../../../db/models/Cart.js";

export const signInResolver = async (_root, args, context) => {
  const { email, password } = args;
  try {
    const idToken = context.req.headers.authorization?.split(" ")[1];

    const result = await verify(idToken);

    if (email && password) {
      const [user] = await User.find({
        email,
        password,
      });
      if (!user) {
        throw new GraphQLError(UserErrorMessage.NOT_FOUND);
      }
      const token = "1234567890";
      const { firstName, lastName, age, userId, cartId, contactNumber } = user;
      // user.token = token;
      return {
        firstName,
        lastName,
        userId,
        age,
        email,
        token,
        cartId,
        contactNumber,
      };
    }

    const [user] = await User.find({ userId: result?.sub });
    if (!user) {
      throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    }
    const {
      firstName,
      lastName,
      age,
      userId,
      email: userEmail,
      cartId,
      contactNumber,
    } = user;
    return {
      firstName,
      lastName,
      userId,
      age,
      email: userEmail,
      token: idToken,
      cartId,
      contactNumber,
    };
  } catch (e) {
    return e;
  }
};

export const getAllUsersResolver = async (_root, _args, context) => {
  try {
    const users = await User.find();

    if (!users.length) throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    return users;
  } catch (e) {
    return e;
  }
};

export const createUserResolver = async (_root, args, context) => {
  const { user } = args;
  const {
    email,
    password,
    firstName,
    lastName,
    // addressLine1,
    // addressLine2,
    // city,
    // parish,
    // country,
    // zip,
    // primary,
    age,
  } = user;
  try {
    const idToken = context.req.headers.authorization?.split(" ")[1];

    const result = await verify(idToken);

    const [currUser] = await User.find({ userId: result?.sub });
    if (currUser) {
      return currUser;
    }
    const userId =
      result?.sub || Math.floor(Math.random() * 10000000).toString();
    // if its a new user, generate a new userId, generate a new cart object and extract the cartId to put in the user object
    // const newCart = new Cart({
    //   userId,
    //   items: [],
    //   total: 0,
    //   subtotal: 0,
    //   tax: 0,
    // });
    // console.log(newCart);
    // const {cartId} = await newCart.save();
    const newUser = new User({
      userId,
      email,
      password,
      firstName,
      lastName,
      age,
      cartId: "placwholder",
    });

    // createAddressResolver(false, false, null, {
    //   userId,
    //   address: {
    //     addressLine1: addressLine1 || "",
    //     addressLine2: addressLine2 || "",
    //     city: city || "",
    //     parish: parish || "",
    //     country: country || "",
    //     zip: zip || "",
    //     primary: primary || false,
    //   },
    // });
    // call the createAddress resolver here with the extra address data from the parameters
    await newUser.save({ safe: true });
    return newUser;
  } catch (e) {
    return e;
  }
};

export const editUserResolver = async (_root, args) => {
  try {
    const { user } = args;
    const { email, firstName, lastName, age, userId } = user;
    const [foundUser] = await User.find({ userId });
    if (!foundUser) throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    foundUser.email = email || foundUser.email;
    foundUser.firstName = firstName || foundUser.firstName;
    foundUser.lastName = lastName || foundUser.lastName;
    foundUser.age = age || foundUser.age;
    await foundUser.save();
    return {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      userId: foundUser.userId,
      age: foundUser.age,
      email: foundUser.email,
      cartId: foundUser.cartId || "placeholder",
    };
  } catch (e) {
    return e;
  }
};

export const deleteUserResolver = async (_root, args) => {
  try {
    const { user } = args;
    const { userId, password } = user;
    const foundUser = await User.findOne({ userId });
    if (!foundUser) throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    const { deletedCount, acknowledged } = await foundUser.deleteOne();
    return {
      success: deletedCount > 0 || acknowledged,
    };
  } catch (e) {
    return e;
  }
};
