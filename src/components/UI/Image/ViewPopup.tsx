import { FC, CSSProperties, useState } from "react";
import {
  HiOutlineMagnifyingGlassMinus as GlassMinus,
  HiOutlineMagnifyingGlassPlus as GlassPlus,
  HiOutlineArrowPath as RotateArrow,
  HiXMark as IconX,
} from "react-icons/hi2";
import { Draggable } from "..";
import { useRender, useOverflow } from "@/hooks";
import Portal from "@/components/Portal";
import utils from "@/utils";

export interface ImageViewPopupProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

const ImageViewPopup: FC<ImageViewPopupProps> = ({ open, url, onClose }) => {
  const render = useRender(open);

  useOverflow(open);

  const [scale, setScale] = useState<number>(1);

  const [rotate, setRotate] = useState<number>(0);

  const openClassName = open ? "image-popup-active" : "";

  const className = utils.formatClassName("image-popup", openClassName);

  const imageStyle: CSSProperties = { transform: `rotate(${rotate}deg) scale(${scale})` };

  const handleRotate = () => setRotate((prev) => prev + 90);

  const handleScale = (type: "plus" | "minus") => {
    if (type === "plus" && scale < 1.4) return setScale((prev) => prev + 0.2);
    if (type === "minus" && scale > 0.6) return setScale((prev) => prev - 0.2);
  };

  return (
    <Portal>
      {render && (
        <div className={className}>
          <div className="popup-head">
            <GlassMinus size={20} onClick={() => handleScale("minus")} />
            <GlassPlus size={20} onClick={() => handleScale("plus")} />
            <RotateArrow size={20} onClick={handleRotate} />
            <IconX size={20} onClick={onClose} />
          </div>
          <div className="popup-view">
            <Draggable>
              <img style={imageStyle} className="view-image" src={url} />
            </Draggable>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default ImageViewPopup;
