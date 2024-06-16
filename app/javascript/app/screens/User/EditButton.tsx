import type { FC } from "react";

const EditButton: FC = () => {
  return (
    <a
      href="/profile"
      className="py-1 px-3 bg-gray-200 rounded-md hover:bg-gray-300"
    >
      Edit Profile
    </a>
  );
};

export default EditButton;
