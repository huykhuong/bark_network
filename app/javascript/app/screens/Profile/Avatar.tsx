import { useRef, useState, type FC } from "react";

import avatarPlaceholder from "../../images/avatarPlaceholder.png";
import { getCSRFToken } from "../../utils/getCSRFToken";

interface Props {
  avatar: string | null;
}

const Avatar: FC<Props> = ({ avatar }) => {
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleUploadAvatar = () => {
    if (!avatarRef.current) {
      return;
    }

    const avatar = avatarRef.current.files[0];

    if (!avatar) return;

    setAvatarImage(avatar);
  };

  const handleSubmit = () => {
    if (!avatarImage) return;

    const formData = new FormData();

    formData.append("profile[avatar]", avatarImage);

    fetch("profile/avatar", {
      headers: {
        "X-CSRF-Token": getCSRFToken(),
      },
      method: "PATCH",
      body: formData,
    });
  };

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Avatar
      </h2>
      <div className="flex items-center justify-start">
        <div className="inline-block mr-4">
          <img
            className="rounded-full max-w-none w-14 h-14"
            src={avatar || avatarPlaceholder}
          />
        </div>

        <div className="mr-4">
          <input
            ref={avatarRef}
            type="file"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="avatar"
            id="avatar"
            onChange={handleUploadAvatar}
          />
        </div>

        <button
          className="disabled:opacity-50 disabled:hover:bg-indigo-600 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Avatar;
