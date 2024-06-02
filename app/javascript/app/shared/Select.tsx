import { FC, useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface Props {
  name: string;
  label: string;
  value: string | number;
  options: { name: string; value: string }[];
  error?: string;
}

const Select: FC<Props> = ({ name, label, value, options, error }) => {
  const [selectedValue, setSelectedValue] = useState(value.toString());

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        value={selectedValue}
        id={name}
        name={name}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={handleSelect}
      >
        {options.map((option, i) => (
          <option key={`item_${i}`} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default Select;
