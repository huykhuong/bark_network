import { useState, type FC } from "react";

interface Props {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
}

const TextArea: FC<Props> = ({
  value: initialValue,
  name,
  label,
  placeholder,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value}
          rows={4}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TextArea;
