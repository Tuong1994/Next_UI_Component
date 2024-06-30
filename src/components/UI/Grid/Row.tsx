"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { ComponentAligns, ComponentJustify } from "@/common/type";
import { GridRowContext } from "./Context";
import utils from "@/utils";

export interface GridRowProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  gutters?: [number?, number?];
  justify?: ComponentJustify;
  align?: ComponentAligns;
}

const GridRow: ForwardRefRenderFunction<HTMLDivElement, GridRowProps> = (
  { rootClassName = "", style, gutters = [], justify = "start", align = "top", children, ...restProps },
  ref
) => {
  const justifyClassName = `grid-row-${justify}`;

  const alignClassName = `grid-row-${align}`;

  const className = utils.formatClassName("grid-row", justifyClassName, alignClassName, rootClassName);

  const inlineStyle = () => {
    if (!gutters.length) return { ...style, gap: "10px" };
    if (gutters.length === 1) return { ...style, gap: `${gutters[0]}px` };
    if (gutters.length === 2) return { ...style, rowGap: `${gutters[0]}px`, columnGap: `${gutters[1]}px` };
  };

  return (
    <GridRowContext.Provider value={{ gutters }}>
      <div ref={ref} style={inlineStyle()} {...restProps} className={className}>
        {children}
      </div>
    </GridRowContext.Provider>
  );
};

export default forwardRef(GridRow);
