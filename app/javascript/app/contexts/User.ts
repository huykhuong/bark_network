import { createContext } from "react";

import { UserModel } from "../models/User";



export const NULL_USER: UserModel = {
  account: { id: 0, email: "", friendships: [], username: "" },
  profile: {
    id: 0,
    avatar: "",
    bio: "",
    displayName: "",
    dateOfBirth: "",
    lastSignedIn: "",
    gender: "male",
    setup: false,
  },
  userLoggedIn: false,
};

export const UserContext = createContext<UserModel>(NULL_USER);
