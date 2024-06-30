"use client"

import { createContext } from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import { ControlShape } from "../type";

export type FormContextState = {
  isForm: boolean;
  disabled?: boolean;
  autoFocusValidation?: boolean;
  sizes?: ComponentSize;
  shape?: ControlShape;
  color?: Exclude<ComponentColor, "black" | "white" | "gray">;
};

const FormContext = createContext<FormContextState>({
  isForm: false,
});

export default FormContext;
