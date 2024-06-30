"use client"

import { HTMLAttributes, ForwardRefRenderFunction, CSSProperties, forwardRef } from "react";
import { ComponentSize } from "@/common/type";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

type NoteMessageType = "default" | "error";

type NoteMessageSize = ComponentSize | number;

export interface NoteMessageProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  message?: string;
  weight?: number;
  italic?: boolean;
  type?: NoteMessageType;
  size?: NoteMessageSize;
}

const NoteMessage: ForwardRefRenderFunction<HTMLDivElement, NoteMessageProps> = (
  {
    rootClassName = "",
    style,
    message = "",
    type = "default",
    size = "md",
    italic,
    weight = 400,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const typeClassName = `note-message-${type}`;

  const italicClassName = italic ? `note-message-italic` : "";

  const themeClassName = `note-message-${theme}`;

  const className = utils.formatClassName(
    "note-message",
    typeClassName,
    italicClassName,
    themeClassName,
    rootClassName
  );

  const inlineStyle = (): CSSProperties => {
    const customStyle: CSSProperties = { ...style, fontWeight: weight };
    if (typeof size === "number") return { ...customStyle, fontSize: `${size}px` };
    if (size === "sm") return { ...customStyle, fontSize: "12px" };
    if (size === "md") return { ...customStyle, fontSize: "14px" };
    if (size === "lg") return { ...customStyle, fontSize: "18px" };
    return { ...customStyle };
  };

  return (
    <div ref={ref} style={inlineStyle()} {...restProps} className={className}>
      {message}
    </div>
  );
};

export default forwardRef(NoteMessage);
