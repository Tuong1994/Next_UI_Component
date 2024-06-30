import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import utils from "@/utils";

export interface LayoutBodyProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
}

const LayoutBody: ForwardRefRenderFunction<HTMLDivElement, LayoutBodyProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const className = utils.formatClassName("body", rootClassName);

  return (
    <div ref={ref} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default forwardRef(LayoutBody);
