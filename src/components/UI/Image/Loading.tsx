import { CSSProperties, ForwardRefRenderFunction, forwardRef } from "react";
import { Spinner } from "../Loading";

interface ImageLoadingProps {
  imageSize: () => CSSProperties;
}

const ImageLoading: ForwardRefRenderFunction<HTMLDivElement, ImageLoadingProps> = ({ imageSize }, ref) => {
  return (
    <div ref={ref} style={imageSize()} className="image-loading">
      <Spinner size={20} />
    </div>
  );
};

export default forwardRef(ImageLoading);
