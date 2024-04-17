import type { FC } from "react";

interface Props {
  error: string;
}

const ErrorMessage: FC<Props> = ({ error }) => {
  return <small className="m-0 mt-1 text-red-600 inline-block">{error}</small>;
};

export default ErrorMessage;
