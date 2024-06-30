import { useState, useCallback, useEffect } from "react";

const useRender = (trigger: boolean, time = 300) => {
  const [render, setRender] = useState<boolean>(false);

  const debouncedSetRender = useCallback(
    (value: boolean) => {
      const timeout = setTimeout(() => setRender(value), time);
      return () => clearTimeout(timeout);
    },
    [time]
  );

  useEffect(() => {
    if (!render && trigger) setRender(true);
    else if (render && !trigger) debouncedSetRender(false);
  }, [trigger, render, debouncedSetRender]);

  return render;
};

export default useRender;
