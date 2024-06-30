"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import utils from "@/utils";
import useLayout from "../Layout/useLayout";

type DividerType = "horizontal" | "vertical";

type ContentPlacement = "left" | "center" | "right";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  plain?: boolean;
  verticalSize?: number;
  placement?: ContentPlacement;
  type?: DividerType;
}

const Divider: ForwardRefRenderFunction<HTMLDivElement, DividerProps> = (
  {
    rootClassName = "",
    type = "horizontal",
    verticalSize = 20,
    children,
    plain,
    placement = "left",
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const placementClassName = `divider-${placement}`;

  const plainClassName = plain ? `divider-plain` : "";

  const themeClassName = `divider-${theme}`;

  const showHorizontal = type === "horizontal";

  const showVertical = type === "vertical";

  const verticalStyle = { height: `${verticalSize}px` };

  const className = utils.formatClassName(
    "divider",
    placementClassName,
    plainClassName,
    themeClassName,
    rootClassName
  );

  return (
    <div ref={ref} {...restProps} className={className}>
      {showHorizontal && (
        <div className="divider-horizontal">
          {children && <div className="horizontal-content">{children}</div>}
        </div>
      )}

      {showVertical && <div style={verticalStyle} className="divider-vertical" />}
    </div>
  );
};

export default forwardRef(Divider);
