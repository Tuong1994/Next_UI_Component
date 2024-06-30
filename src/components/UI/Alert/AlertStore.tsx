import { ReactNode } from "react";
import { create, StateCreator } from "zustand";
import {
  HiCheckCircle as SuccessIcon,
  HiXCircle as ErrorIcon,
  HiInformationCircle as InfoIcon,
} from "react-icons/hi2";
import { PiWarningCircleFill as WarningIcon } from "react-icons/pi";
import { AlertType, AlertIcon } from "./type";
import { ComponentPlacement } from "@/common/type";

export type AlertOptions = {
  icons?: AlertIcon;
  placement?: Exclude<ComponentPlacement, "left" | "right">;
};

interface AlertState {
  open: boolean;
  message: ReactNode;
  type: AlertType;
  options: AlertOptions;
  onOpen: (message: ReactNode, type: AlertType) => void;
  onClose: () => void;
  configOptions: (options: AlertOptions) => void;
}

const store: StateCreator<AlertState> = (set) => ({
  open: false,
  message: "",
  type: "info",
  options: {
    placement: "top",
    icons: {
      successIcon: <SuccessIcon size={20} />,
      errorIcon: <ErrorIcon size={20} />,
      warningIcon: <WarningIcon size={20} />,
      infoIcon: <InfoIcon size={20} />,
    },
  },
  onOpen: (message: ReactNode, type: AlertType) =>
    set((state) => ({ ...state, open: true, message, type })),
  onClose: () => set((state) => ({ ...state, open: false })),
  configOptions: (options) => set((state) => ({ ...state, options: { ...state.options, ...options } })),
});

const useAlertStore = create(store);

export default useAlertStore;
