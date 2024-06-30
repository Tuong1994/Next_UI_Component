import { useEffect } from "react";
import useAlertStore, { AlertOptions } from "./AlertStore";

const useAlert = (options?: AlertOptions) => {
  const [onOpen, configOptions] = useAlertStore((state) => [state.onOpen, state.configOptions]);

  useEffect(() => {
    if (options) configOptions(options);
  }, []);

  const success = (message: string) => onOpen(message, "success");
  const error = (message: string) => onOpen(message, "error");
  const warning = (message: string) => onOpen(message, "warning");
  const info = (message: string) => onOpen(message, "info");

  const alertApi = { success, error, warning, info };

  return alertApi;
};

export default useAlert;
