import { type FC, type PropsWithChildren } from "react";

export const REACTION_COLORS = {
  heart: "#ec4899",
  like: "#3b82f6",
  haha: "#fde047",
  wow: "#a855f7",
  sad: "#6b7280",
  angry: "#ef4444",
};

interface Props {
  icon: JSX.Element;
  name: string;
  postId: number;
  decolorized: boolean;
  userId?: number;
  onClick: () => void;
}

const ReactionButton: FC<PropsWithChildren<Props>> = ({
  name,
  children,
  icon,
  decolorized,
  onClick,
}) => {
  const reactionColor = REACTION_COLORS[name];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center hover:rounded-md hover:bg-slate-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill={decolorized ? "currentColor" : reactionColor}
        className={`h-[35px] p-2 hover:rounded-md hover:bg-slate-100 cursor-pointer`}
      >
        {icon}
      </svg>
      {children}
    </button>
  );
};

export default ReactionButton;
