import type { FC } from "react";

import Input from "../../shared/TextInput";
import barkLogo from "../../images/bark.png";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import ErrorAlert from "../../shared/Alerts/ErrorAlert";
import ScreenWrapper from "../ScreenWrapper";

const Login: FC = () => {
  const { formRef, loading, errors, submit } = useFormSubmit("/login", "user");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    submit();
  };

  const errorMessage = errors.unconfirmed || errors.authentication;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src={barkLogo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Let's get in Bark network
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          {errorMessage && <ErrorAlert text={errorMessage} />}

          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form ref={formRef} className="space-y-6">
              <Input
                type="text"
                label="Username"
                name="username"
                value=""
                error={errors.username}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                value=""
                error={errors.password}
              />
              <input
                type="button"
                value={loading ? "Loading" : "Sign up"}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenWrapper(Login);
