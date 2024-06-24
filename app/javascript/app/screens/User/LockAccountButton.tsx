import { FC, useContext } from "react";

import { useToggleLockAccountMutation } from "@graphql-generated";

import { UserContext } from "@contexts/User";

const LockAccountButton: FC = () => {
  const {
    account: { locked },
  } = useContext(UserContext);

  const [toggleLockAccount] = useToggleLockAccountMutation();

  const handleToggleLockAccount = () => {
    toggleLockAccount().then(() => {
      window.location.reload();
    });
  };

  return (
    <button
      className="py-1 px-3 bg-gray-200 rounded-md hover:bg-gray-300"
      onClick={handleToggleLockAccount}
    >
      {locked ? "Unlock" : "Lock"} Account
    </button>
  );
};

export default LockAccountButton;
