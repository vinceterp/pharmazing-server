import { UserErrorMessage } from "../utils/enums.js";

let users = [
  {
    userId: "1234567890",
    email: "me@me.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    cardId: [],
    address: {
      addressLine1: "123 Main Street",
      city: "Kingston",
      parish: "St. Andrew",
      country: "Jamaica",
      zip: "12345",
    },
  },
  {
    userId: "1234560",
    email: "me2@me.com",
    password: "password",
    firstName: "Jane",
    lastName: "Doe",
    cardId: [],
    address: {
      addressLine1: "123 Master Street",
      city: "St. James",
      parish: "St. Andrew",
      country: "Jamaica",
      zip: "12325",
    },
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
