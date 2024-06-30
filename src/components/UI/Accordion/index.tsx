"use client"

import {
  HTMLAttributes,
  ReactNode,
  ForwardRefRenderFunction,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { HiOutlineChevronDown as ArrowDown } from "react-icons/hi2";
import utils from "@/utils";
import useLayout from "../Layout/useLayout";

type AccordionType = "default" | "group";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  bordered?: boolean;
  hasArrow?: boolean;
  type?: AccordionType;
  isCollapsed?: boolean;
  extra?: ReactNode | ReactNode[];
  label?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
  expandIcon?: (collapse: boolean) => ReactNode;
  onCollapse?: (collapse: boolean) => void;
}

const Accordion: ForwardRefRenderFunction<HTMLDivElement, AccordionProps> = (
  {
    rootClassName = "",
    bordered = true,
    hasArrow = true,
    label,
    children,
    extra,
    type = "default",
    isCollapsed = false,
    expandIcon,
    onCollapse,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [collapse, setCollapse] = useState<boolean>(false);

  const panelRef = useRef<HTMLDivElement>(null);

  const collapsed = type === "default" ? collapse : isCollapsed;

  const themeClassName = `accordion-${theme}`;

  const borderedClassName = bordered ? "accordion-bordered" : "";

  const activeClassName = collapsed ? `accordion-active ${!bordered ? "accordion-no-bordered" : ""}` : "";

  const className = utils.formatClassName(
    "accordion",
    borderedClassName,
    activeClassName,
    themeClassName,
    rootClassName
  );

  useEffect(() => {
    onCollapse?.(collapse);
  }, [collapse]);

  useEffect(() => {
    if (!panelRef.current) return;
    if (panelRef.current === null) return;

    const panel = panelRef.current;
    if (!isCollapsed) panel.style.maxHeight = "";
    else panel.style.maxHeight = `${panel.scrollHeight}px`;
  }, [isCollapsed]);

  const handleCollapse = () => {
    utils.collapse(panelRef);
    setCollapse(!collapse);
  };

  const handleAction = () => {
    if (!children) return;
    if (type === "default") handleCollapse();
  };

  return (
    <div ref={ref} {...restProps} className={className}>
      <div className="accordion-head" onClick={handleAction}>
        <div className="head-label">
          {hasArrow && (
            <div className="label-icon">
              {expandIcon ? expandIcon(collapse) : <ArrowDown size={16} className="icon" />}
            </div>
          )}
          <div>{label}</div>
        </div>
        {extra && <div className="head-extra">{extra}</div>}
      </div>

      {children && (
        <div ref={panelRef} className="accordion-panel">
          <div className="panel-inner">{children}</div>
        </div>
      )}
    </div>
  );
};

export default forwardRef(Accordion);
