import { ProfileModel } from "./Profile";

export type UserModel = {
  account: {
    id: number;
    email: string;
    friends: ProfileModel[];
    username: string;
  };
  profile: ProfileModel;
  userLoggedIn: boolean;
};
