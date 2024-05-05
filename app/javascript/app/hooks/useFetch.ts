import { useEffect, useRef, useState } from "react";
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

  // This is to cleanup the fetch request when the component unmounts
  useEffect(() => {
    return () => {
      if (abortController.current) abortController.current.abort();
    };
  }, []);

  const fetchFn = (url: string, body: Record<string, any>) => {
    setErrors({});
    setData({});
    setLoading(true);

    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

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

        const { data } = json;

        setData(data);

        if (data.redirect) {
          setTimeout(() => {
            window.Turbolinks.visit(data.redirect);
          }, data.timeout || 0);
        }
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
