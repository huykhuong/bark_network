import { useState, type FC } from "react";

import avatarPlaceholder from "../../images/avatarPlaceholder.png";

const BUTTON_TEXT = {
  suggested: ["Friend Request Sent", "Add Friend"],
  sent: ["Friend Request Cancelled", "Cancel"],
};

interface Props {
  id: number;
  avatar: string;
  displayName: string;
  bio: string;
  mode: "suggested" | "sent";
  onClick: (e: React.MouseEvent) => Promise<boolean>;
}

const FriendCard: FC<Props> = ({
  id,
  avatar,
  displayName,
  bio,
  mode,
  onClick,
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    onClick(e).then((res) => {
      if (res) {
        setDisabled(true);
      }
    });
  };

  const buttonClassName = disabled
    ? "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
    : "rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

  return (
    <div
      key={id}
      className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border border border-slate-200/80 p-2"
    >
      <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 overflow-hidden bg-transparent shadow-none rounded-xl bg-clip-border">
        <img
          src={avatar || avatarPlaceholder}
          alt={`user_${displayName}`}
          className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-slate-800">
              {displayName}
            </h5>
          </div>
          <p className="text-slate-500 dark:text-slate-300 text-sm">{bio}</p>
        </div>
      </div>
      <button
        disabled={disabled}
        className={buttonClassName}
        onClick={handleClick}
      >
        {BUTTON_TEXT[mode][disabled ? 0 : 1]}
      </button>
    </div>
  );
};

export default FriendCard;
