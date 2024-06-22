import { ProfileModel } from "./Profile";

type Friendship = { id: number; friendProfile: ProfileModel };

export type UserModel = {
  account: {
    id: number;
    email: string;
    friendships: Friendship[];
    username: string;
  };
  profile: ProfileModel;
  userLoggedIn: boolean;
};
