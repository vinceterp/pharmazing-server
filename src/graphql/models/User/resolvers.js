/* eslint-disable no-unused-vars */
import { GraphQLError } from "graphql";
import { UserErrorMessage } from "../../../utils/enums.js";
import { createAddressResolver } from "../Address/resolvers.js";
import { verify } from "../../../utils/verify.js";

export let users = [
  {
    userId: "1234567890",
    email: "me@me.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    age: 22,
  },
  {
    userId: "1234560",
    email: "me2@me.com",
    password: "password",
    firstName: "Jane",
    lastName: "Doe",
  },
];

export const signInResolver = async (_root, args, context) => {
  const { email, password } = args;
  try {
    console.log("context", context.req.headers.authorization);
    const idToken = context.req.headers.authorization.split(" ")[1];
    // console.log(context.req.headers.authorization);
    const result = await verify(idToken);

    if (email && password) {
      const user = users.find(
        (user) => user.email === email && user.password === password,
      );
      if (!user) {
        throw new GraphQLError(UserErrorMessage.NOT_FOUND);
      }
      const token = "1234567890";
      user.token = token;
      return user;
    }
    console.log("result", result);
    const user = users.find((user) => user.userId === result?.sub);
    console.log("user", user);
    if (!user) {
      throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    }
    return user;
    // const token
  } catch (e) {
    return e;
  }
};

export const getAllUsersResolver = (_root, _args, context) => {
  try {
    // console.log(context);
    if (!users) throw new GraphQLError(UserErrorMessage.NOT_FOUND);
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
    addressLine1,
    addressLine2,
    city,
    parish,
    country,
    zip,
    primary,
    age,
  } = user;
  try {
    const idToken = context.req.headers.authorization.split(" ")[1];
    console.log(context.req.headers.authorization);
    const result = await verify(idToken);
    if (users.find((user) => user.email === email)) {
      throw new GraphQLError(UserErrorMessage.ALREADY_EXISTS);
    }
    const userId =
      result?.sub || Math.floor(Math.random() * 10000000).toString();
    console.log("userId", userId);
    const newUser = {
      userId,
      email,
      password,
      firstName,
      lastName,
      age,
    };

    createAddressResolver(false, false, null, {
      userId,
      address: {
        addressLine1: addressLine1 || "",
        addressLine2: addressLine2 || "",
        city: city || "",
        parish: parish || "",
        country: country || "",
        zip: zip || "",
        primary: primary || false,
      },
    });
    console.log("newUser", newUser);
    // call the createAddress resolver here with the extra address data from the parameters
    users.push(newUser);
    return newUser;
  } catch (e) {
    return e;
  }
};

export const editUserResolver = (_root, args) => {
  try {
    const { user } = args;
    const { email, firstName, lastName, age, userId } = user;
    const foundIndex = users.findIndex((user) => user.userId === userId);
    if (foundIndex === -1) throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    users[foundIndex] = {
      ...users[foundIndex],
      firstName: firstName || users[foundIndex].firstName,
      lastName: lastName || users[foundIndex].lastName,
      email: email || users[foundIndex].email,
      age: age || users[foundIndex].age,
    };
    return { ...users[foundIndex] };
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
