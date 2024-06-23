import type { FC } from "react";

import toast from "react-hot-toast";

import type { Flash as FlashModel } from "../models/Flash";

interface Props {
  flash: FlashModel | undefined;
}

const Flash: FC<Props> = ({ flash }) => {
  if (!flash) return null;

  const [type, message] = flash[0];

  const TOAST = {
    notice: toast.success,
    alert: toast.error,
  };

  if (flash) {
    const toaster = TOAST[type];
    toaster(message, { position: "top-right" });
  }

  return null;
};

export default Flash;
