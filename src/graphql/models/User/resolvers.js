/* eslint-disable no-unused-vars */
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
      throw new Error(UserErrorMessage.NOT_FOUND);
    }
    const token = "1234567890";
    user.token = token;
    return user;
  } catch (e) {
    return { email, error: e.message };
  }
};

export const getAllUsers = (_root, _args) => {
  try {
    if (!users) throw new Error(UserErrorMessage.NOT_FOUND);
    return users;
  } catch (e) {
    return [{ error: e.message }];
  }
};

export const createUser = (_root, args) => {
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
  } = args;
  try {
    if (users.find((user) => user.email === email)) {
      throw new Error(UserErrorMessage.ALREADY_EXISTS);
    }
    const userId = Math.floor(Math.random() * 10000000);

    const user = {
      userId,
      email,
      password,
      firstName,
      lastName,
    };
    // call the createAddress resolver here with the extra address data from the parameters
    users.push(user);
    return user;
  } catch (e) {
    return { email, error: e.message };
  }
};
