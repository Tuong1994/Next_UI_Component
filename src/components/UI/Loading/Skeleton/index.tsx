import { HTMLAttributes, ForwardRefRenderFunction, CSSProperties, Fragment, forwardRef } from "react";
import {
  ButtonSkeletonProps,
  ImageSkeletonProps,
  ParagraphSkeletonProps,
  SkeletonType,
  TitleSkeletonProps,
} from "./type";
import utils from "@/utils";

interface CommonProps extends HTMLAttributes<HTMLDivElement> {
  type?: SkeletonType;
  rootClassName?: string;
}

type SkeletonProps = (
  | TitleSkeletonProps
  | ParagraphSkeletonProps
  | ImageSkeletonProps
  | ButtonSkeletonProps
) &
  CommonProps;

const Skeleton: ForwardRefRenderFunction<HTMLDivElement, SkeletonProps> = (
  { rootClassName = "", type, options, style, ...restProps },
  ref
) => {
  const commonProps = { ref, ...restProps };

  const shapeClassName = `skeleton-${options?.shape ?? "square"}`;

  const className = utils.formatClassName("skeleton", shapeClassName, rootClassName);

  const inlineStyle = (): CSSProperties => {
    const rootStyle = { ...style };
    if (type !== "image") {
      const width = typeof options?.width === "number" ? `${options?.width}px` : options?.width;
      const height = typeof options?.height === "number" ? `${options?.height}px` : options?.height;
      return { ...rootStyle, width, height };
    }
    if (type === "image") {
      if (options?.size) {
        const optionSize = options?.size ?? 100;
        return { ...rootStyle, width: `${optionSize}px`, height: `${optionSize}px` };
      }
      const optionWidth = options?.width ?? 100;
      const optionHeight = options?.height ?? 100;
      const width = typeof options?.width === "number" ? `${optionWidth}px` : optionWidth;
      const height = typeof options?.height === "number" ? `${optionHeight}px` : optionHeight;
      return { ...rootStyle, width, height };
    }
    return rootStyle;
  };

  return (
    <Fragment>
      {type === "title" && (
        <div style={inlineStyle()} {...commonProps} className={`${className} skeleton-title`}></div>
      )}

      {type === "paragraph" && (
        <div className="skeleton-paragraph" style={inlineStyle()}>
          {[...Array(options?.lines ?? 4)].map((_, idx) => (
            <div
              key={idx}
              style={inlineStyle()}
              {...commonProps}
              className={`${className} skeleton-paragraph-line`}
            ></div>
          ))}
        </div>
      )}

      {type === "image" && (
        <div style={inlineStyle()} {...commonProps} className={`${className} skeleton-image`}></div>
      )}

      {type === "button" && (
        <div style={inlineStyle()} {...commonProps} className={`${className} skeleton-button`}></div>
      )}
    </Fragment>
  );
};

export default forwardRef(Skeleton);
