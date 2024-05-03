import { createContext } from "react";
import { UserModel } from "../models/User";

const NULL_USER: UserModel = {
  username: "",
  email: "",
  userSignedIn: false,
};

export const UserContext = createContext<UserModel>(NULL_USER);
