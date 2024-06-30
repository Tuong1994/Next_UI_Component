import { ReactNode } from "react";
import { create, StateCreator } from "zustand";
import { ToastMessage, ToastMessages, ToastType } from "./type";
import {
  HiOutlineCheckCircle as SuccessIcon,
  HiOutlineXCircle as ErrorIcon,
  HiOutlineInformationCircle as InfoIcon,
} from "react-icons/hi2";
import { PiWarningCircle as WarningIcon } from "react-icons/pi";
import utils from "@/utils";

export type MessageOptions = {
  successIcon?: ReactNode;
  errorIcon?: ReactNode;
  warningIcon?: ReactNode;
  infoIcon?: ReactNode;
};

interface ToastState {
  toasts: ToastMessages;
  options: MessageOptions;
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
  configOptions: (options: MessageOptions) => void;
}

const store: StateCreator<ToastState> = (set) => ({
  toasts: [],
  options: {
    successIcon: <SuccessIcon size={20} />,
    errorIcon: <ErrorIcon size={20} />,
    warningIcon: <WarningIcon size={20} />,
    infoIcon: <InfoIcon size={20} />,
  },
  addToast: (type, message) => {
    const newToast: ToastMessage = { id: utils.uuid(), type, message };
    set((state) => ({ ...state, toasts: [newToast, ...state.toasts] }));
  },
  removeToast: (id) =>
    set((state) => ({ ...state, toasts: [...state.toasts].filter((toast) => toast.id !== id) })),
  configOptions: (options) => set((state) => ({ ...state, options: { ...state.options, ...options } })),
});

const useToastStore = create(store);

export default useToastStore;
