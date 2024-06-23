import { useEffect, type RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
): void {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}
