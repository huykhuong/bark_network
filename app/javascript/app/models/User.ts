import { ProfileModel } from "./Profile";

export type UserModel = {
  account: { username: string; email: string };
  profile: ProfileModel;
  userLoggedIn: boolean;
};
