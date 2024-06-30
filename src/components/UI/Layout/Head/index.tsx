"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, useContext, forwardRef } from "react";
import LayoutContext from "../Context";
import useLayout from "../useLayout";
import utils from "@/utils";

export interface LayoutHeadProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  fixed?: boolean;
}

const LayoutHead: ForwardRefRenderFunction<HTMLDivElement, LayoutHeadProps> = (
  { rootClassName = "", children, fixed, ...restProps },
  ref
) => {
  const { layouted } = useContext(LayoutContext);

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const themeClassName = `head-${theme}`;

  const fixedClassName = fixed || layouted ? `head-fixed` : "";

  const className = utils.formatClassName("head", fixedClassName, themeClassName, rootClassName);

  return (
    <header ref={ref} {...restProps} className={className}>
      {children}
    </header>
  );
};

export default forwardRef(LayoutHead);
