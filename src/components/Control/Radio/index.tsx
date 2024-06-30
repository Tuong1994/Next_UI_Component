"use client";

import {
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEvent,
  useContext,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import { useFormContext } from "react-hook-form";
import { useLang } from "@/hooks";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
  rootStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  controlStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "gray">;
  required?: boolean;
  optional?: boolean;
  onCheck?: (value: any) => void;
}

const Radio: ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    controlClassName = "",
    name,
    rootStyle,
    labelStyle,
    controlStyle,
    label,
    sizes = "md",
    color = "blue",
    checked = false,
    required,
    optional,
    disabled,
    value,
    onCheck,
    onBlur,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const { color: rhfColor, sizes: rhfSizes } = useContext(FormContext);

  const { isRhf, rhfValue, rhfName, rhfDisabled, rhfError, rhfOnChange } = useContext(FormItemContext);

  const { lang } = useLang();

  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const controlName = rhfName ? rhfName : name;

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const showOptional = required ? false : optional;

  const controlSize = isRhf ? rhfSizes : sizes;

  const gapClassName = !isRhf ? "radio-gap" : "";

  const sizeClassName = `radio-${controlSize}`;

  const colorClassName = `radio-${controlColor}`;

  const errorClassName = rhfError ? "radio-group-error" : "";

  const disabledClassName = controlDisabled ? "radio-group-disabled" : "";

  const themeClassName = `radio-${theme}`;

  const mainClassName = utils.formatClassName(
    "radio",
    gapClassName,
    sizeClassName,
    colorClassName,
    themeClassName,
    rootClassName
  );

  const groupClassName = utils.formatClassName("radio-group", errorClassName, disabledClassName);

  const controlLabelClassName = utils.formatClassName("group-label", labelClassName);

  const controlCheckClassName = utils.formatClassName("group-checked", controlClassName);

  useEffect(() => {
    if (!isRhf) return setIsChecked(checked);
    if (isRhf && rhfValue == value) return setIsChecked(true);
  }, [value, checked, isRhf, rhfValue]);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setIsChecked(checked);
    onCheck?.(value);
  };

  const onChangeFn = rhfOnChange ? rhfOnChange : handleChecked;

  return (
    <div style={rootStyle} className={mainClassName}>
      <label className={groupClassName}>
        <input
          {...rhfMethods?.register(rhfName)}
          ref={ref}
          {...restProps}
          value={value}
          name={controlName}
          disabled={controlDisabled}
          checked={isChecked}
          type="radio"
          className="group-control"
          onChange={onChangeFn}
        />

        <div style={controlStyle} className={controlCheckClassName} />

        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {required && <span className="label-required">*</span>}
            <span>{label}</span>
            {showOptional && <span className="label-optional">({lang.common.form.others.optional})</span>}
          </div>
        )}
      </label>
    </div>
  );
};

export default forwardRef(Radio);
