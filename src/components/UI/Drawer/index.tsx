"use client"

import { CSSProperties, ReactNode, ForwardRefRenderFunction, Fragment, forwardRef } from "react";
import { HiXMark } from "react-icons/hi2";
import { useOverflow, useRender } from "@/hooks";
import Portal from "@/components/Portal";
import utils from "@/utils";

export interface DrawerProps {
  rootClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  style?: CSSProperties;
  headStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  open?: boolean;
  hasHead?: boolean;
  full?: boolean;
  head?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
  onClose?: () => void;
}

const Drawer: ForwardRefRenderFunction<HTMLDivElement, DrawerProps> = (
  {
    rootClassName = "",
    headClassName = "",
    bodyClassName = "",
    style,
    headStyle,
    bodyStyle,
    head = "Drawer",
    children,
    open = false,
    hasHead = true,
    full,
    onClose,
  },
  ref
) => {
  const render = useRender(open);

  useOverflow(open);

  const backdropActiveClassName = open ? "drawer-backdrop-active" : "";

  const drawerActiveClassName = open ? "drawer-active" : "";

  const drawerFullClassName = full ? "drawer-full" : "";

  const noHeadClassName = !hasHead ? "drawer-body-height-full" : "";

  const backdropClassName = utils.formatClassName("drawer-backdrop", backdropActiveClassName);

  const drawerHeadClassName = utils.formatClassName("drawer-head", headClassName);

  const drawerBodyClassName = utils.formatClassName("drawer-body", noHeadClassName, bodyClassName);

  const mainClassName = utils.formatClassName(
    "drawer",
    drawerFullClassName,
    drawerActiveClassName,
    rootClassName
  );

  return (
    <Portal>
      {render && (
        <Fragment>
          <div className={backdropClassName} onClick={onClose} />

          <div ref={ref} style={style} className={mainClassName}>
            {hasHead && (
              <div style={headStyle} className={drawerHeadClassName}>
                {head}
                <HiXMark size={18} className="head-icon" onClick={onClose} />
              </div>
            )}
            <div style={bodyStyle} className={drawerBodyClassName}>
              {children}
            </div>
          </div>
        </Fragment>
      )}
    </Portal>
  );
};

export default forwardRef(Drawer);
