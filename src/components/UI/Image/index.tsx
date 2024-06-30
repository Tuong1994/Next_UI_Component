'use client'

import {
  ImgHTMLAttributes,
  CSSProperties,
  ForwardRefRenderFunction,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { ComponentSize } from "@/common/type";
import ImageView from "./View";
import ImageLoading from "./Loading";
import utils from "@/utils";

type ImageSize = ComponentSize;

type ImageObjectFit = "fill" | "cover" | "contain" | "none";

type ImageLazyType = "immediate" | "lazy";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  rootClassName?: string;
  rootStyle?: CSSProperties;
  imgWidth?: number | string;
  imgHeight?: number | string;
  size?: ImageSize;
  objectFit?: ImageObjectFit;
  lazyType?: ImageLazyType;
  hasView?: boolean;
  hasRemove?: boolean;
  hasCheck?: boolean;
  onRemove?: () => void;
  onCheck?: (checked: boolean) => void;
}

const Image: ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
  {
    rootClassName = "",
    rootStyle,
    size,
    imgWidth,
    imgHeight,
    objectFit = "fill",
    lazyType = "lazy",
    src = "/default-image.jpg",
    onCheck,
    ...restProps
  },
  ref
) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [view, setView] = useState<string>("");

  const [checked, setChecked] = useState<boolean>(false);

  const rootCheckedClassName = checked ? "image-checked" : "";

  const elRef = useRef<HTMLDivElement>(null);

  const fitClassName = `image-${objectFit}`;

  const className = utils.formatClassName("image", fitClassName, rootCheckedClassName, rootClassName);

  useEffect(() => {
    if (lazyType === "lazy") {
      if (window["IntersectionObserver"]) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setView(src as string);
            if (elRef.current && elRef.current !== null) observer.unobserve(elRef.current);
          }
        });
        if (elRef.current && elRef.current !== null) observer.observe(elRef.current);
      } else setView(src as string);
    } else setView(src as string);
  }, [src]);

  const imageSize = (): CSSProperties => {
    if (size) {
      if (size === "sm") return { width: `100px`, height: `100px` };
      if (size === "md") return { width: `200px`, height: `200px` };
      if (size === "lg") return { width: `300px`, height: `300px` };
    }
    if (imgWidth && !imgHeight) return { width: imgWidth, height: "auto" };
    if (imgHeight && !imgWidth) return { width: "auto", height: imgHeight };
    if (imgWidth && imgHeight) {
      const width = typeof imgWidth === "string" ? imgWidth : `${imgWidth}px`;
      const height = typeof imgHeight === "string" ? imgHeight : `${imgHeight}px`;
      return { width, height };
    }
    return { width: "auto", height: "auto" };
  };

  const handleImageLoaded = () => setLoading(false);

  const handleCheck = (checked: boolean) => {
    setChecked(checked);
    onCheck?.(checked);
  };

  return (
    <div style={{ ...rootStyle, ...imageSize() }} className={className}>
      {loading && !view ? (
        <ImageLoading ref={elRef} imageSize={imageSize} />
      ) : (
        <ImageView
          ref={ref}
          {...restProps}
          src={view}
          checked={checked}
          imageSize={imageSize}
          onLoad={handleImageLoaded}
          handleCheck={handleCheck}
        />
      )}
    </div>
  );
};

export default forwardRef(Image);
