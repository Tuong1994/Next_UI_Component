import { RefObject, useState, useEffect, useCallback } from "react";

const useDetectBottom = (ref: RefObject<HTMLElement>, distance = 250) => {
  const [bottom, setBottom] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!ref.current) return;
    const elBottom = ref.current.getBoundingClientRect().bottom;
    if (window.innerHeight - elBottom < distance) setBottom(true);
    else setBottom(false);
  }, [ref.current, distance]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return bottom;
};

export default useDetectBottom;
