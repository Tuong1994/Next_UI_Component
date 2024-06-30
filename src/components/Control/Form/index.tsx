"use client";

import { FormHTMLAttributes, ReactNode, ForwardedRef, useEffect, forwardRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ComponentSize } from "@/common/type";
import { ControlColor, ControlShape } from "../type";
import FormContext, { FormContextState } from "./FormContext";
import useFormStore, { FormMethods } from "./FormStore";

export interface FormProps<M> extends FormHTMLAttributes<HTMLFormElement> {
  initialData: M;
  disabled?: boolean;
  autoFocusValidation?: boolean;
  color?: ControlColor;
  shape?: ControlShape;
  sizes?: ComponentSize;
  children?: ReactNode | ReactNode[];
  onFinish?: (formData: M) => void;
}

const Form = <M extends object>(
  {
    initialData,
    color = "blue",
    sizes = "md",
    shape = "square",
    autoFocusValidation = true,
    children,
    disabled,
    onFinish,
    ...restProps
  }: FormProps<M>,
  ref: ForwardedRef<HTMLFormElement>
) => {
  const setForm = useFormStore((state) => state.setForm);

  const rhfMethods = useForm<M>({ values: initialData, mode: "all" });

  const formContextState: FormContextState = {
    isForm: true,
    autoFocusValidation,
    color,
    sizes,
    shape,
    disabled,
  };

  useEffect(() => {
    const { handleSubmit, watch, reset } = rhfMethods;
    const methods: FormMethods = {
      resetForm: reset,
      watchField: watch,
      handleSubmit: handleSubmit(onSubmit),
    };
    setForm(methods);
  }, []);

  const onSubmit = (formData: M) => onFinish?.(formData);

  return (
    <FormProvider {...rhfMethods}>
      <FormContext.Provider value={formContextState}>
        <form ref={ref} {...restProps} onSubmit={rhfMethods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default forwardRef(Form);
