import { ProfileModel } from "./Profile";

type Friendship = {
  id: number;
  friendProfile: ProfileModel;
  friendUsername: string;
};

export type UserModel = {
  account: {
    id: number;
    email: string;
    friendships: Friendship[];
    username: string;
    locked: boolean;
  };
  profile: ProfileModel;
  userLoggedIn: boolean;
};
