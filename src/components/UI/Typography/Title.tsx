"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, Fragment, forwardRef } from "react";
import { TypographyAlign, TypographyVariant } from "./type";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  weight?: number;
  level?: TitleLevel;
  underline?: boolean;
  remove?: boolean;
  italic?: boolean;
  align?: TypographyAlign;
  variant?: TypographyVariant;
}

const Title: ForwardRefRenderFunction<HTMLHeadingElement, TitleProps> = (
  {
    rootClassName = "",
    level = 1,
    children,
    underline,
    remove,
    italic,
    style,
    weight = 500,
    align = "left",
    variant = "default",
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const variantClassName = `title-${variant}`;

  const alignClassName = `title-${align}`;

  const underlineClassName = underline ? "title-underline" : "";

  const removeClassName = remove ? "title-remove" : "";

  const italicClassName = italic ? "title-italic" : "";

  const themeClassName = `title-${theme}`;

  const commonProps = {
    ...restProps,
    ref,
    style: { ...style, fontWeight: weight },
    className: utils.formatClassName(
      "title",
      `title-${level}`,
      alignClassName,
      removeClassName,
      italicClassName,
      underlineClassName,
      variantClassName,
      themeClassName,
      rootClassName
    ),
  };

  return (
    <Fragment>
      {level === 1 && <h1 {...commonProps}>{children}</h1>}
      {level === 2 && <h2 {...commonProps}>{children}</h2>}
      {level === 3 && <h3 {...commonProps}>{children}</h3>}
      {level === 4 && <h4 {...commonProps}>{children}</h4>}
      {level === 5 && <h5 {...commonProps}>{children}</h5>}
      {level === 6 && <h6 {...commonProps}>{children}</h6>}
    </Fragment>
  );
};

export default forwardRef(Title);
