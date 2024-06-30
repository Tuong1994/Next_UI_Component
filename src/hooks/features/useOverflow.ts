import { useEffect } from "react";

const useOverflow = (trigger: boolean) => {
  useEffect(() => {
    if (trigger) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [trigger]);
};

export default useOverflow;
