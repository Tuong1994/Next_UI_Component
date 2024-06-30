import { InputHTMLAttributes, CSSProperties, ForwardRefRenderFunction, forwardRef } from "react";
import { HiPlus } from "react-icons/hi2";
import utils from "@/utils";

interface SingleImageUploadControlProps extends InputHTMLAttributes<HTMLInputElement> {
  controlClassName?: string;
  controlStyle?: CSSProperties;
}

const SingleImageUploadControl: ForwardRefRenderFunction<HTMLInputElement, SingleImageUploadControlProps> = (
  { controlClassName = "", controlStyle, ...restProps },
  ref
) => {
  const controlInputClassName = utils.formatClassName("group-control", controlClassName);

  return (
    <label style={controlStyle} className={controlInputClassName}>
      <input ref={ref} {...restProps} type="file" className="control-input" />
      <HiPlus size={25} className="control-icon" />
    </label>
  );
};

export default forwardRef(SingleImageUploadControl);
