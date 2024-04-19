import { useRef, useState } from "react";
import { getCSRFToken } from "../utils/getCSRFToken";

export function useFetch(): {
  fetchFn: (url: string, body: Record<string, any>) => void;
  data: Record<string, string>;
  loading: boolean;
  errors: Record<string, string>;
} {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  const fetchFn = (url: string, body: Record<string, any>) => {
    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

    setLoading(true);

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": getCSRFToken(),
      },
      body: JSON.stringify(body),
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

  return { fetchFn, data, loading, errors };
}
