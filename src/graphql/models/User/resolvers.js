/* eslint-disable no-unused-vars */
import { GraphQLError } from "graphql";
import { UserErrorMessage } from "../../../utils/enums.js";

let users = [
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

export const signin = (_root, args) => {
  const { email, password } = args;
  try {
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    }
    const token = "1234567890";
    user.token = token;
    return user;
  } catch (e) {
    return e;
  }
};

export const getAllUsers = (_root, _args) => {
  try {
    if (!users) throw new GraphQLError(UserErrorMessage.NOT_FOUND);
    return users;
  } catch (e) {
    return e;
  }
};

export const createUser = (_root, args) => {
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
  } = user;
  try {
    if (users.find((user) => user.email === email)) {
      throw new GraphQLError(UserErrorMessage.ALREADY_EXISTS);
    }
    const userId = Math.floor(Math.random() * 10000000);

    const newUser = {
      userId,
      email,
      password,
      firstName,
      lastName,
    };
    // call the createAddress resolver here with the extra address data from the parameters
    users.push(newUser);
    return newUser;
  } catch (e) {
    return e;
  }
};

export const editUser = (_root, args) => {
  try {
    const { email, firstName, lastName, age, userId } = args;

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

export const deleteUser = (_root, args) => {
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
