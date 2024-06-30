import { CSSProperties, FC, Fragment } from "react";
import { ComponentColor } from "@/common/type";
import { FaSpinner } from "react-icons/fa";
import utils from "@/utils";

type SpinnerType = "default" | "bubble";

export interface SpinnerProps {
  rootClassName?: string;
  style?: CSSProperties;
  type?: SpinnerType;
  size?: number;
  color?: ComponentColor;
}

const Spinner: FC<SpinnerProps> = ({
  rootClassName = "",
  style,
  size = 14,
  color = "gray",
  type = "default",
}) => {
  const dotStyle = { width: `${size}px`, height: `${size}px` };

  const colorClassName = type === "default" ? `spinner-default-${color}` : `spinner-bubble-${color}`;

  const defaultClassName = utils.formatClassName("spinner-default", colorClassName, rootClassName);

  const bubbleClassName = utils.formatClassName("spinner-bubble", colorClassName, rootClassName);

  return (
    <Fragment>
      {type === "default" && <FaSpinner style={style} size={size} className={defaultClassName} />}

      {type === "bubble" && (
        <div style={style} className={bubbleClassName}>
          {[...Array(2)].map((_, idx) => (
            <div className="bubble-item" key={idx}>
              <div style={dotStyle} className="item-dot"></div>
              <div style={dotStyle} className="item-dot"></div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Spinner;
