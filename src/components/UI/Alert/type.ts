import { ReactNode } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export type AlertIcon = {
  successIcon?: ReactNode;
  errorIcon?: ReactNode;
  warningIcon?: ReactNode;
  infoIcon?: ReactNode;
};
