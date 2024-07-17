/* eslint-disable no-unused-vars */
import { GraphQLError } from "graphql";
import { UserErrorMessage } from "../../../utils/enums.js";
import { createAddressResolver } from "../Address/resolvers.js";
import { verify } from "../../../utils/verify.js";
import { User } from "../../../db/models/User.js";

// export let users = [
//   {
//     userId: "1234567890",
//     email: "me@me.com",
//     password: "password",
//     firstName: "John",
//     lastName: "Doe",
//     age: 22,
//   },
//   {
//     userId: "1234560",
//     email: "me2@me.com",
//     password: "password",
//     firstName: "Jane",
//     lastName: "Doe",
//   },
// ];

export const signInResolver = async (_root, args, context) => {
  const { email, password } = args;
  try {
    // const users = await User.find();
    const idToken = context.req.headers.authorization?.split(" ")[1];

    const result = await verify(idToken);

    if (email && password) {
      const [user] = await User.find({
        email,
        password,
      });
      // console.log("user", user);
      if (!user) {
        throw new GraphQLError(UserErrorMessage.NOT_FOUND);
      }
      const token = "1234567890";
      const { firstName, lastName, age, userId } = user;
      // user.token = token;
      return { firstName, lastName, userId, age, email, token };
    }

    const [user] = await User.find({ userId: result?.sub });
    if (!user) {
      throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    }
    const { firstName, lastName, age, userId, email: userEmail } = user;
    return {
      firstName,
      lastName,
      userId,
      age,
      email: userEmail,
      token: idToken,
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
    console.log("result", result);

    const [currUser] = await User.find({ userId: result?.sub });
    console.log("currUser", currUser);
    if (currUser) {
      console.log("gothere");
      // throw new GraphQLError(UserErrorMessage.ALREADY_EXISTS);
      return currUser;
    }
    // const currUser = users.find((user) => user.userId === result?.sub);
    const userId =
      result?.sub || Math.floor(Math.random() * 10000000).toString();
    console.log("userId", userId);
    const newUser = new User({
      userId,
      email,
      password,
      firstName,
      lastName,
      age,
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
    console.log("newUser", newUser);
    return newUser;
  } catch (e) {
    console.log("error", e?.message);
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
    };
  } catch (e) {
    return e;
  }
};

export const deleteUserResolver = (_root, args) => {
  try {
    const { user } = args;
    const { userId, password } = user;
    const foundIndex = users.findIndex(
      (user) => user.userId === userId && user.password === password,
    );
    if (foundIndex === -1) throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    const deletedUser = users[foundIndex];
    users = users.filter((user) => user.userId !== deletedUser.userId);
    return { error: null, ...deletedUser };
  } catch (e) {
    return e;
  }
};
