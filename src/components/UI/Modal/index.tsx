"use client"

import {
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  Fragment,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { HiXMark } from "react-icons/hi2";
import { ComponentColor, ComponentSize } from "@/common/type";
import { useOverflow, useRender } from "@/hooks";
import Portal from "@/components/Portal";
import Button, { ButtonProps } from "../Button";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

export interface ModalProps {
  rootClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  footClassName?: string;
  style?: CSSProperties;
  headStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footStyle?: CSSProperties;
  head?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
  hasHead?: boolean;
  hasFoot?: boolean;
  hasCloseIcon?: boolean;
  hasCancelButton?: boolean;
  backdropClose?: boolean;
  open?: boolean;
  sizes?: ComponentSize;
  color?: ComponentColor;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  okButtonTitle?: ReactNode | ReactNode[];
  cancelButtonTitle?: ReactNode | ReactNode[];
  onOk?: () => void;
  onCancel?: () => void;
}

const Modal: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  {
    rootClassName = "",
    headClassName = "",
    bodyClassName = "",
    footClassName = "",
    style,
    headStyle,
    bodyStyle,
    footStyle,
    head = "Modal",
    children,
    sizes = "md",
    color = "blue",
    hasHead = true,
    hasFoot = true,
    hasCloseIcon = true,
    hasCancelButton = true,
    backdropClose = true,
    open = false,
    okButtonTitle = "OK",
    cancelButtonTitle = "Cancel",
    okButtonProps,
    cancelButtonProps,
    onOk,
    onCancel,
  },
  ref
) => {
  useOverflow(open);

  const render = useRender(open);

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const modalRef = useRef<HTMLDivElement>(null);

  const modalBackdropRef = useRef<HTMLDivElement>(null);

  const sizeClassName = `modal-${sizes}`;

  const colorClassName = `modal-${color}`;

  const themeClassName = `modal-${theme}`;

  const backdropActiveClassName = open ? "modal-backdrop-active" : "";

  const modalActiveClassName = open ? "modal-active" : "";

  const backdropClassName = utils.formatClassName("modal-backdrop", backdropActiveClassName);

  const mainClassName = utils.formatClassName(
    "modal",
    colorClassName,
    sizeClassName,
    themeClassName,
    modalActiveClassName,
    rootClassName
  );

  const modalHeadClassName = utils.formatClassName("modal-head", headClassName);

  const modalBodyClassName = utils.formatClassName("modal-body", bodyClassName);

  const modalFootClassName = utils.formatClassName("modal-foot", footClassName);

  const okButtonColor = color === "white" || color === "gray" ? "blue" : okButtonProps?.color ?? color;

  const okActionProps: ButtonProps = { type: "button", ...okButtonProps, color: okButtonColor };

  const cancelActionProps: ButtonProps = { type: "button", ...cancelButtonProps };

  useImperativeHandle(ref, () => modalRef.current as HTMLDivElement);

  useEffect(() => {
    if (!document) return;
    const modals = document.querySelectorAll(".modal-active");
    if (modals.length === 1) return;
    if (modalRef.current !== null && modalBackdropRef.current !== null) {
      const modalzIndex = 35 + modals.length;
      const backdropszIndex = 34 + modals.length;
      modalRef.current.style.zIndex = `${modalzIndex}`;
      modalBackdropRef.current.style.zIndex = `${backdropszIndex}`;
    }
  });

  return (
    <Portal>
      {render && (
        <Fragment>
          <div
            ref={modalBackdropRef}
            className={backdropClassName}
            onClick={() => backdropClose && onCancel?.()}
          />

          <div ref={modalRef} style={style} className={mainClassName}>
            {hasHead && (
              <div style={headStyle} className={modalHeadClassName}>
                {head}
                {hasCloseIcon && <HiXMark size={20} className="head-icon" onClick={onCancel} />}
              </div>
            )}

            <div style={bodyStyle} className={modalBodyClassName}>
              {children}
            </div>

            {hasFoot && (
              <div style={footStyle} className={modalFootClassName}>
                {hasCancelButton && (
                  <Button {...cancelActionProps} onClick={onCancel}>
                    {cancelButtonTitle}
                  </Button>
                )}
                <Button {...okActionProps} onClick={onOk}>
                  {okButtonTitle}
                </Button>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Portal>
  );
};

export default forwardRef(Modal);
