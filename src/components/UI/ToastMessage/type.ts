export type ToastType = "success" | "error" | "warning" | "info";

export type ToastMessage = {
  id: string;
  type: ToastType;
  message: string;
};

export type ToastMessages = ToastMessage[];
