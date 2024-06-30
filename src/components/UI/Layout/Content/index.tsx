"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, useContext, forwardRef } from "react";
import LayoutContext from "../Context";
import useLayout from "../useLayout";
import utils from "@/utils";

export interface LayoutContentProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
}

const LayoutContent: ForwardRefRenderFunction<HTMLDivElement, LayoutContentProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const { layouted } = useContext(LayoutContext);

  const { layoutValue } = useLayout();

  const { shrinked, resizeContent, layoutTheme: theme } = layoutValue;

  const layoutClassName = layouted ? "content-layout" : "";

  const resizeClassName = resizeContent ? "content-resize" : "";

  const shrinkClassName = shrinked ? "content-shrinked" : "";

  const themeClassName = `content-${theme}`;

  const className = utils.formatClassName(
    "content",
    layoutClassName,
    shrinkClassName,
    resizeClassName,
    themeClassName,
    rootClassName
  );

  return (
    <div ref={ref} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default forwardRef(LayoutContent);
