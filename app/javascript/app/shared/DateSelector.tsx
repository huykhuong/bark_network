import { useState, type FC } from "react";

import ErrorMessage from "./ErrorMessage";

interface Props {
  error?: string;
  name: string;
  label: string;
  value: string | number;
}

const DateSelector: FC<Props> = ({ error, name, label, value }) => {
  const [date, setDate] = useState(value);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="date"
        value={date}
        id={name}
        name={name}
        onChange={handleDateChange}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default DateSelector;
