import { useState, type FC } from "react";

import ErrorMessage from "./ErrorMessage";

interface Props {
  label: string;
  name: string;
  value: string;
  error?: string;
  type: "text" | "number" | "email" | "password";
  underscoreForSpace?: boolean;
}

const Input: FC<Props> = ({
  name,
  label,
  error,
  type,
  value: initialValue,
  underscoreForSpace,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = underscoreForSpace
      ? e.target.value.replace(" ", "_")
      : e.target.value;

    setValue(updatedValue);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}:
      </label>
      <div className="mt-2">
        <input
          type={type}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
        />
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default Input;
