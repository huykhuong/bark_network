import { useRef, type FC, useState } from "react";

import { getCSRFToken } from "../utils/getCSRFToken";
import Input from "../shared/TextInput";
import SuccessAlert from "../shared/SuccessAlert";

const SignUp: FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const abortController = useRef<AbortController | null>(null);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

    const formData = new FormData(formRef.current);

    const data = {};

    for (const [k, v] of formData.entries()) {
      data[k] = v;
    }

    setLoading(true);

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": getCSRFToken(),
      },
      body: JSON.stringify({ user: data }),
      signal: abortController.current.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          throw new Error(JSON.stringify(json.errors));
        }

        setData(json.data);
      })
      .catch((err) => {
        setErrors(JSON.parse(err.message));
        abortController.current.abort();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
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
    </>
  );
};

export default SignUp;
