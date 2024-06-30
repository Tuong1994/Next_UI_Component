"use client"

import { CSSProperties, ForwardRefRenderFunction, forwardRef } from "react";
import { useRender } from "@/hooks";
import ToastMessageItem from "./Item";
import Portal from "@/components/Portal";
import useToastStore from "./ToastStore";
import utils from "@/utils";

export interface ToastMessageProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  showProgress?: boolean;
}

const ToastMessage: ForwardRefRenderFunction<HTMLDivElement, ToastMessageProps> = (
  { rootClassName = "", itemClassName = "", style, itemStyle, showProgress = true },
  ref
) => {
  const toasts = useToastStore((state) => state.toasts);

  const render = useRender(toasts.length > 0);

  const className = utils.formatClassName("toast-message", rootClassName);

  return (
    <Portal>
      {render && (
        <div ref={ref} style={style} className={className}>
          {toasts.map((toast) => (
            <ToastMessageItem
              key={toast.id}
              toast={toast}
              itemClassName={itemClassName}
              itemStyle={itemStyle}
              showProgress={showProgress}
            />
          ))}
        </div>
      )}
    </Portal>
  );
};

export default forwardRef(ToastMessage);
