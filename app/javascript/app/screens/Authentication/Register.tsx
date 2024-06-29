import type { FC } from "react";

import { useFormSubmit } from "@hooks/useFormSubmit";
import barkLogo from "@images/bark.png";
import SuccessAlert from "@shared/Alerts/SuccessAlert";
import MainContainer from "@shared/MainContainer";
import Input from "@shared/TextInput";

const SignUp: FC = () => {
  const { formRef, data, loading, errors, submit } = useFormSubmit(
    "/register",
    "user",
  );

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <MainContainer>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src={barkLogo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          {data.message && <SuccessAlert text={data.message} />}

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
                type="email"
                label="Email address"
                name="email"
                value=""
                error={errors.email}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                value=""
                error={errors.password}
              />
              <Input
                type="password"
                label="Password confirmation"
                name="password_confirmation"
                value=""
                error={errors.password_confirmation}
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
    </MainContainer>
  );
};

export default SignUp;
