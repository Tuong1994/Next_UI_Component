import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import utils from "@/utils";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
}

const Section: ForwardRefRenderFunction<HTMLDivElement, SectionProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const className = utils.formatClassName("section", rootClassName);

  return (
    <section ref={ref} {...restProps} className={className}>
      {children}
    </section>
  );
};

export default forwardRef(Section);
