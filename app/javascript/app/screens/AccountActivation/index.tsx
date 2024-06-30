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
            Your account has been successfully activated. You can now log in
            with your email and password.
          </p>
        )}
        {!confirmed && (
          <a href="/confirmations" data-method="post" rel="nofollow">
            Resend Activation Email
          </a>
        )}
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(AccountActivation);
