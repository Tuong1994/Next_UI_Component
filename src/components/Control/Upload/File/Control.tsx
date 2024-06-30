import {
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  DragEvent,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { UploadError } from "../../type";
import { useLang } from "@/hooks";
import utils from "@/utils";

interface FileUploadControlProps extends InputHTMLAttributes<HTMLInputElement> {
  controlClassName?: string;
  controlStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  error: UploadError | null;
  dragged: boolean;
  handleDrag: (e: DragEvent<HTMLLabelElement>) => void;
  handleDrop: (e: DragEvent<HTMLLabelElement>) => void;
}

const FileUploadControl: ForwardRefRenderFunction<HTMLInputElement, FileUploadControlProps> = (
  {
    controlClassName = "",
    controlStyle,
    label,
    disabled,
    error,
    dragged,
    handleDrag,
    handleDrop,
    ...restProps
  },
  ref
) => {
  const { lang } = useLang();

  const dragClassName = dragged ? "upload-group-dragged" : "";

  const errorClassName = error?.active ? "upload-group-error" : "";

  const disabledClassName = disabled ? "upload-group-disabled" : "";

  const controlInputClassName = utils.formatClassName(
    "upload-group",
    dragClassName,
    errorClassName,
    disabledClassName,
    controlClassName
  );

  const renderLabel = () => {
    if (label) return label;
    return (
      <div className="group-label">
        <AiOutlineUpload size={18} />
        <span>{lang.common.form.placeholder.filesUpload}</span>
      </div>
    );
  };

  return (
    <label
      style={controlStyle}
      className={controlInputClassName}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input ref={ref} {...restProps} disabled={disabled} type="file" className="group-control" />
      {renderLabel()}
    </label>
  );
};

export default forwardRef(FileUploadControl);
