import { createContext } from "react";
import { UserModel } from "../models/User";

export const NULL_USER: UserModel = {
  avatar: "",
  email: "",
  username: "",
};

export const UserContext = createContext<UserModel>(NULL_USER);
