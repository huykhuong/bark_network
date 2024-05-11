import { type FC } from "react";

import { ProfileModel } from "../../models/Profile";
import Avatar from "./Avatar";
import MainProfile from "./MainProfile";

const Profile: FC<{ profile: ProfileModel }> = ({ profile }) => {
  return (
    <div className="grid grid-cols-1 gap-y-5">
      <Avatar avatar={profile.avatar} />
      <MainProfile profile={profile} />
    </div>
  );
};

export default Profile;
