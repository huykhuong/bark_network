import { createContext } from "react";

import { UserModel } from "../models/User";

export const NULL_USER: UserModel = {
  account: {
    id: 0,
    confirmed: false,
    email: "",
    friendships: [],
    username: "",
    locked: false,
  },
  profile: null,
  userLoggedIn: false,
};

export const UserContext = createContext<UserModel>(NULL_USER);
