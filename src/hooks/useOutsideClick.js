import { useEffect, useRef } from "react";

export function useOutsideClick(handler, isCapturingPhase = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener("click", handleClick, isCapturingPhase);
    return () =>
      document.removeEventListener("click", handleClick, isCapturingPhase);
  }, [handler, isCapturingPhase]);

  return ref;
}
