"use client"

import { CSSProperties, ForwardRefRenderFunction, useEffect, useRef, forwardRef } from "react";
import { useRender } from "@/hooks";
import Portal from "@/components/Portal";
import useAlertStore from "./AlertStore";
import utils from "@/utils";

export interface AlertProps {
  rootClassName?: string;
  style?: CSSProperties;
}

const Alert: ForwardRefRenderFunction<HTMLDivElement, AlertProps> = ({ rootClassName = "", style }, ref) => {
  const [open, type, message, options, onClose] = useAlertStore((state) => [
    state.open,
    state.type,
    state.message,
    state.options,
    state.onClose,
  ]);

  const { placement, icons } = options;

  const timeRef = useRef<any>(null);

  const render = useRender(open);

  const typeClassName = `alert-${type}`;

  const placementClassName = `alert-${placement}`;

  const activeClassName = open ? "alert-active" : "";

  const className = utils.formatClassName(
    "alert",
    typeClassName,
    placementClassName,
    activeClassName,
    rootClassName
  );

  useEffect(() => {
    timeRef.current = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(timeRef.current);
  });

  const iconType = () => {
    const icon: Record<any, any> = {
      success: icons?.successIcon,
      error: icons?.errorIcon,
      warning: icons?.warningIcon,
      info: icons?.infoIcon,
    };
    return icon[type ?? "info"];
  };

  return (
    <Portal>
      {render && (
        <div ref={ref} style={style} className={className} onClick={onClose}>
          <div className="alert-icon">{iconType()}</div>
          <p className="alert-message">{message}</p>
        </div>
      )}
    </Portal>
  );
};

export default forwardRef(Alert);
