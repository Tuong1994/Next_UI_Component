"use client"

import { ReactNode, FC, Fragment, useContext } from "react";
import { Controller, useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { NoteMessage } from "@/components/UI";
import { FieldError, FormRule } from "../type";
import FormItemContext, { FormItemContextState, FormItemType } from "./FormItemContext";
import FormContext from "./FormContext";

export interface FormItemProps {
  name: string;
  type?: FormItemType;
  rules?: FormRule[];
  disabled?: boolean;
  children?: ReactNode | ReactNode[];
}

const FormItem: FC<FormItemProps> = ({ name, type = "default", disabled = false, rules = [], children }) => {
  const { sizes, disabled: formDisabled } = useContext(FormContext);

  const itemDisabled = formDisabled ? formDisabled : disabled;

  const {
    field: { name: rhfName, value: rhfValue, onChange: rhfOnChange, onBlur: rhfOnBlur },
    fieldState: { invalid: rhfError },
    formState: { errors },
  } = useController({ name });

  const initialState: FormItemContextState = {
    type,
    isRhf: true,
    rhfError,
    rhfName,
    rhfValue,
    rhfDisabled: itemDisabled,
    rhfOnChange,
    rhfOnBlur,
  };

  const getRules = () => {
    const fieldError: FieldError = {};
    if (itemDisabled) return fieldError;
    if (!rules.length) return fieldError;
    rules.forEach((rule) => {
      if (rule.required) fieldError.required = { value: rule.required, message: rule.message };
      if (rule.max) fieldError.max = { value: rule.max, message: rule.message };
      if (rule.maxLength) fieldError.maxLength = { value: rule.maxLength, message: rule.message };
      if (rule.min) fieldError.min = { value: rule.min, message: rule.message };
      if (rule.minLength) fieldError.minLength = { value: rule.minLength, message: rule.message };
      if (rule.phone) fieldError.pattern = { value: rule.pattern, message: rule.message };
      if (rule.email) fieldError.pattern = { value: rule.pattern, message: rule.message };
      if (rule.whiteSpace) fieldError.pattern = { value: rule.pattern, message: rule.message };
      if (rule.validate) fieldError.validate = rule.validate;
    });
    return fieldError;
  };

  return (
    <FormItemContext.Provider value={initialState}>
      <div className={`form-item-${sizes}`}>
        <Controller name={name} rules={{ ...getRules() }} render={() => <Fragment>{children}</Fragment>} />
        <ErrorMessage
          name={name}
          errors={errors}
          render={(error) => <NoteMessage type="error" message={error.message} />}
        />
      </div>
    </FormItemContext.Provider>
  );
};

export default FormItem;
