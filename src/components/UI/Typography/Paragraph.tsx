"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, CSSProperties, forwardRef } from "react";
import { TypographyAlign, TypographyVariant } from "./type";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  weight?: number;
  size?: number;
  lineHeight?: number;
  underline?: boolean;
  strong?: boolean;
  mark?: boolean;
  remove?: boolean;
  italic?: boolean;
  align?: TypographyAlign;
  variant?: TypographyVariant;
}

const Paragraph: ForwardRefRenderFunction<HTMLParagraphElement, ParagraphProps> = (
  {
    rootClassName = "",
    children,
    underline,
    strong,
    mark,
    remove,
    italic,
    align = "left",
    variant = "default",
    style,
    weight = 400,
    size = 14,
    lineHeight = 25,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const variantClassName = `paragraph-${variant}`;

  const alignClassName = `paragraph-${align}`;

  const underlineClassName = underline ? "paragraph-underline" : "";

  const strongClassName = strong ? "paragraph-strong" : "";

  const removeClassName = remove ? "paragraph-remove" : "";

  const italicClassName = italic ? "paragraph-italic" : "";

  const themeClassName = `paragraph-${theme}`;

  const inlineStyle = (): CSSProperties => {
    const defaultStyle = { ...style, fontSize: `${size}px`, lineHeight: `${lineHeight}px` };
    if (strong) return defaultStyle;
    return { ...defaultStyle, fontWeight: weight };
  };

  const className = utils.formatClassName(
    "paragraph",
    alignClassName,
    underlineClassName,
    strongClassName,
    removeClassName,
    italicClassName,
    variantClassName,
    themeClassName,
    rootClassName
  );

  return (
    <p ref={ref} style={inlineStyle()} {...restProps} className={className}>
      {mark ? <mark>{children}</mark> : children}
    </p>
  );
};

export default forwardRef(Paragraph);
