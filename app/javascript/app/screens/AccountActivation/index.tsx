import { UserContext } from "@contexts/User";
import MainContainer from "@shared/MainContainer";
import ScreenWrapper from "app/screens/ScreenWrapper";

import { useContext } from "react";

const AccountActivation = () => {
  const {
    account: { confirmed },
  } = useContext(UserContext);

  return (
    <>
      <MainContainer>
        <h1 className="text-3xl font-bold mb-5">Account Activation</h1>
        {confirmed && (
          <p>
            Your account has been successfully activated. No further action is
            needed.
          </p>
        )}
        {!confirmed && (
          <>
            <a
              href="/confirmations"
              data-method="post"
              rel="nofollow"
              className="text-blue-500 hover:text-blue-600"
            >
              Resend Activation Email
            </a>

            <a
              href="/logout"
              data-method="delete"
              rel="nofollow"
              className="block mt-5"
            >
              Logout
            </a>
          </>
        )}
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(AccountActivation);
