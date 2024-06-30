"use client";

import {
  TextareaHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEvent,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useCallback,
} from "react";
import { HiXCircle } from "react-icons/hi2";
import { ControlColor, ControlShape, InputValue } from "../type";
import { ComponentSize } from "@/common/type";
import { useFormContext } from "react-hook-form";
import { useLang } from "@/hooks";
import FormItemContext from "../Form/FormItemContext";
import FormContext from "../Form/FormContext";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  required?: boolean;
  optional?: boolean;
  hasClear?: boolean;
  onChangeInput?: (text: string) => void;
}

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    value = "",
    sizes = "md",
    color = "blue",
    shape = "square",
    placeholder = "Enter information...",
    rows = 5,
    disabled,
    required,
    optional,
    hasClear = true,
    onBlur,
    onChangeInput,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { layoutValue } = useLayout();

  const { lang } = useLang();

  const { layoutTheme: theme } = layoutValue;

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape, autoFocusValidation } = useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = useContext(FormItemContext);

  const [inputValue, setInputValue] = useState<InputValue>(value);

  const [touched, setTouched] = useState<boolean>(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const controlPlaceholder = placeholder ?? lang.common.form.placeholder.enter;

  const showClearIcon = hasClear && inputValue && !controlDisabled;

  const showOptional = required ? false : optional;

  const themClassName = `textarea-${theme}`;

  const sizeClassName = `textarea-${controlSize}`;

  const colorClassName = `textarea-${controlColor}`;

  const shapeClassName = `textarea-${controlShape}`;

  const disabledClassName = controlDisabled ? "textarea-disabled" : "";

  const errorClassName = rhfError ? "textarea-error" : "";

  const mainClassName = utils.formatClassName(
    "textarea",
    colorClassName,
    sizeClassName,
    shapeClassName,
    errorClassName,
    themClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("textarea-label", labelClassName);

  const controlInputClassName = utils.formatClassName("control-box", inputClassName);

  const triggerValidation = useCallback(() => {
    if (touched && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && rhfValue) rhfMethods.trigger(rhfName);
  }, [touched, rhfMethods, rhfName, rhfValue]);

  // Trigger validation
  useEffect(() => {
    if (!isRhf) return;
    triggerValidation();
  }, [isRhf, triggerValidation]);

  // Focus input when error is trigger
  useEffect(() => {
    if (!rhfError) return;
    if (autoFocusValidation) inputRef.current?.click();
  }, [rhfError, autoFocusValidation]);

  // Set default value
  useEffect(() => {
    if (isRhf) return setInputValue(rhfValue);
    setInputValue(value);
  }, [value, isRhf, rhfValue]);

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const handleFocus = () => setTouched(true);

  const handleBlur = () => setTouched(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (isRhf) rhfMethods.setValue(rhfName, value);
    onChangeInput?.(value);
  };

  const handleClearInput = () => {
    setInputValue("");
    if (isRhf) rhfMethods.setValue(rhfName, "");
    onChangeInput?.("");
  };

  return (
    <div style={rootStyle} className={mainClassName}>
      <label>
        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {required && <span className="label-required">*</span>}
            <span>{label}</span>
            {showOptional && <span className="label-optional">({lang.common.form.others.optional})</span>}
          </div>
        )}

        <div ref={inputRef} className="textarea-group">
          <div className="group-control">
            <textarea
              ref={ref}
              {...restProps}
              rows={rows}
              value={inputValue}
              disabled={controlDisabled}
              placeholder={controlPlaceholder}
              className={controlInputClassName}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            {showClearIcon && (
              <div className="control-action" onClick={handleClearInput}>
                <HiXCircle size={iconSize()} />
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default forwardRef(TextArea);
