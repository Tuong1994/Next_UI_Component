"use client"

import { ButtonHTMLAttributes, ReactNode, ForwardRefRenderFunction, useContext, forwardRef } from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import { ControlShape } from "@/components/Control/type";
import Spinner from "../Loading/Spinner";
import FormContext from "@/components/Control/Form/FormContext";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

type ButtonColor = Exclude<ComponentColor, "white" | "gray">;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  loading?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  text?: boolean;
  sizes?: ComponentSize;
  shape?: ControlShape;
  color?: ButtonColor;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    rootClassName = "",
    children,
    loading,
    sizes = "md",
    shape = "square",
    ghost,
    color,
    disabled,
    text,
    ...restProps
  },
  ref
) => {
  const {
    color: rhfColor,
    sizes: rhfSizes,
    shape: rhfShape,
    disabled: rhfDisabled,
  } = useContext(FormContext);

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const btnDisabled = rhfDisabled ? rhfDisabled : disabled || loading;

  const buttonColor = color ? color : rhfColor;

  const buttonSize = sizes ? sizes : rhfSizes;

  const buttonShape = shape ? shape : rhfShape;

  const isLoading = loading && !text;

  const sizeClassName = `button-${buttonSize}`;

  const shapeClassName = `button-${buttonShape}`;

  const textClassName = text ? "button-text" : "";

  const disabledClassName = disabled ? "button-disabled" : "";

  const loadingClassName = isLoading ? "button-loading" : "";

  const themeClassName = `button-${theme}`;

  const colorClassName = () => {
    if (text) return "";
    if (!ghost && !buttonColor) return "";
    if (ghost && !buttonColor) return `button-ghost`;
    if (!ghost && buttonColor) return `button-color button-${buttonColor}`;
    if (ghost && buttonColor) return `button-ghost button-ghost-${buttonColor}`;
    return "";
  };

  const className = utils.formatClassName(
    "button",
    sizeClassName,
    shapeClassName,
    colorClassName(),
    loadingClassName,
    textClassName,
    themeClassName,
    disabledClassName,
    rootClassName
  );

  return (
    <button ref={ref} {...restProps} disabled={btnDisabled} className={className}>
      {isLoading && <Spinner rootClassName="button-icon" />}
      <span>{children}</span>
    </button>
  );
};

export default forwardRef(Button);
