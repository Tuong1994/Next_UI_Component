"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, useEffect, forwardRef } from "react";
import LayoutContext, { LayoutColor, LayoutContextState, LayoutTheme } from "../Context";
import useLayout from "../useLayout";
import utils from "@/utils";

export interface LayoutContainerProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  theme?: LayoutTheme;
  color?: LayoutColor;
}

const LayoutContainer: ForwardRefRenderFunction<HTMLDivElement, LayoutContainerProps> = (
  { rootClassName = "", theme = "light", color = "blue", children, ...restProps },
  ref
) => {
  const { layoutApi, layoutValue } = useLayout();

  const initialValue: LayoutContextState = { theme: layoutValue.layoutTheme, color, layouted: true };

  const className = utils.formatClassName("container", rootClassName);

  useEffect(() => layoutApi.onSwitchTheme(theme), []);

  return (
    <LayoutContext.Provider value={initialValue}>
      <main ref={ref} {...restProps} className={className}>
        {children}
      </main>
    </LayoutContext.Provider>
  );
};

export default forwardRef(LayoutContainer);
