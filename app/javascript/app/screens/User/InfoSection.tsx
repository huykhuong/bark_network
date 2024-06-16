import type { FC } from "react";

import { ProfileModel } from "../../models/Profile";
import EditButton from "./EditButton";
import FriendIndicator from "./FriendIndicator";

interface Props {
  friends: number;
  canEdit: boolean;
  friendWith: boolean;
  profile: ProfileModel;
  totalPosts: number;
}

const InfoSection: FC<Props> = ({
  friends,
  canEdit,
  friendWith,
  profile,
  totalPosts,
}) => {
  return (
    <div>
      <div className="flex items-center justify-start space-x-4 mb-3">
        <p className="font-bold text-lg">{profile.displayName}</p>
        {canEdit && <EditButton />}
        {friendWith && <FriendIndicator />}
      </div>
      <div className="flex items-center justify-start space-x-4 mb-3">
        <p>
          <span className="font-bold text-lg">{totalPosts}</span> posts
        </p>
        <p>
          <span className="font-bold text-lg">{friends}</span> friends
        </p>
      </div>
      <p className="text-sm">{profile.bio}</p>
    </div>
  );
};

export default InfoSection;
