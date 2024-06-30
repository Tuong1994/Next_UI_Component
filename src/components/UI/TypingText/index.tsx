"use client"

import {
  HTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
  CSSProperties,
  useState,
  useEffect,
} from "react";
import { TypingTextColor } from "./type";
import useTypingInterval from "./useTypingInterval";
import useViewpoint from "@/hooks/features/useViewpoint";
import utils from "@/utils";

export interface TypingTextProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  contentClassName?: string;
  textList?: string[];
  textSize?: number;
  textWeight?: number;
  textColor?: TypingTextColor;
}

const TypingText: ForwardRefRenderFunction<HTMLDivElement, TypingTextProps> = (
  {
    rootClassName = "",
    contentClassName = "",
    textList = ["Typing Text"],
    textSize = 40,
    textWeight = 500,
    textColor,
    style,
    ...restProps
  },
  ref
) => {
  const [contentSize, setContentSize] = useState({ textSize, height: textSize + 5 });

  const { isPhone, isTablet } = useViewpoint();

  const typingText = useTypingInterval(textList);

  const colorClassName = textColor ? `typing-text-${textColor}` : "";

  const mainClassName = utils.formatClassName("typing-text", colorClassName, rootClassName);

  const textClassName = utils.formatClassName("typing-text-content", contentClassName);

  const rootStyle: CSSProperties = { ...style, height: contentSize.height };

  const textStyle: CSSProperties = { fontSize: contentSize.textSize, fontWeight: textWeight };

  useEffect(() => {
    if (isTablet) return setContentSize((prev) => ({ ...prev, textSize: 35, height: 40 }));
    if (isPhone) return setContentSize((prev) => ({ ...prev, textSize: 25, height: 30 }));
  }, [isPhone, isTablet]);

  return (
    <div ref={ref} {...restProps} style={rootStyle} className={mainClassName}>
      <div style={textStyle} className={textClassName}>
        {typingText}
        <div className="content-line" />
      </div>
    </div>
  );
};

export default forwardRef(TypingText);
