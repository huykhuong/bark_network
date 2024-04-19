import { useRef } from "react";
import { useFetch } from "./useFetch";

export function useFormSubmit(
  url: string,
  paramKey: string
): {
  formRef: React.MutableRefObject<HTMLFormElement>;
  loading: boolean;
  data: Record<string, string>;
  errors: Record<string, string>;
  submit: () => void;
} {
  const { fetchFn, loading, data, errors } = useFetch();
  const formRef = useRef<HTMLFormElement>(null);

  const submit = () => {
    const formData = new FormData(formRef.current);

    const data = Object.fromEntries(formData.entries());

    fetchFn(url, { [`${paramKey}`]: data });
  };

  return { formRef, loading, data, errors, submit };
}
