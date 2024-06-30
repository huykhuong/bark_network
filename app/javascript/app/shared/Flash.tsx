import { useEffect, type FC } from "react";

import toast from "react-hot-toast";

import type { Flash as FlashModel } from "../models/Flash";

interface Props {
  flash: FlashModel | undefined;
}

const Flash: FC<Props> = ({ flash }) => {
  if (!flash) return null;

  const [type, message] = flash[0];

  useEffect(() => {
    if (type === "notice") {
      toast.success(message, { position: "top-center" });
    }

    if (type === "alert") {
      toast.error(message, { position: "top-center" });
    }
  }, [type, message]);

  return null;
};

export default Flash;
