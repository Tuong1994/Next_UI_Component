"use client"

import {
  InputHTMLAttributes,
  CSSProperties,
  ForwardRefRenderFunction,
  ChangeEvent,
  DragEvent,
  useContext,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { ACCEPT_IMAGE_FILE_TYPE, DEFAULT_FILE_SIZE } from "../../constant";
import { REPLACE_NUM_REGEX, REPLACE_TYPE_REGEX } from "@/common/constant/regex";
import { ControlColor, ControlShape, UploadError } from "@/components/Control/type";
import { NoteMessage } from "@/components/UI";
import { useLang } from "@/hooks";
import Loading from "./Loading";
import Control from "./Control";
import Image from "@/components/UI/Image";
import FormContext from "@/components/Control/Form/FormContext";
import utils from "@/utils";

export interface SingleImageUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  controlClassName?: string;
  rootStyle?: CSSProperties;
  controlStyle?: CSSProperties;
  shape?: ControlShape;
  color?: ControlColor;
  limit?: number;
  defaultImageUrl?: string;
  fileAccepted?: string;
  loading?: boolean;
  onUpload?: (imageFile: File | null) => void;
}

const SingleImageUpload: ForwardRefRenderFunction<HTMLInputElement, SingleImageUploadProps> = (
  {
    rootClassName = "",
    controlClassName = "",
    rootStyle,
    controlStyle,
    shape = "square",
    color = "blue",
    defaultImageUrl = "",
    disabled,
    loading = false,
    limit = DEFAULT_FILE_SIZE,
    fileAccepted = ACCEPT_IMAGE_FILE_TYPE.join(","),
    onUpload,
    ...restProps
  },
  ref
) => {
  const { lang } = useLang();

  const { isForm, color: rhfColor, shape: rhfShape, disabled: formDisabled } = useContext(FormContext);

  const [image, setImage] = useState<File | null>(null);

  const [viewImage, setViewImage] = useState<string>("");

  const [error, setError] = useState<UploadError | null>(null);

  const [dragged, setDragged] = useState<boolean>(false);

  const [uploading, setUploading] = useState<boolean>(loading);

  const controlColor = isForm ? rhfColor : color;

  const controlShape = isForm ? rhfShape : shape;

  const controlDisabled = formDisabled ? formDisabled : disabled;

  const shapeClassName = `single-image-upload-${controlShape}`;

  const colorClassName = `single-image-upload-${controlColor}`;

  const gapClassName = isForm ? "single-image-upload-gap" : "";

  const disabledClassName = controlDisabled ? "upload-group-disabled" : "";

  const errorClassName = error?.active ? "upload-group-error" : "";

  const dragClassName = dragged ? "upload-group-dragged" : "";

  const mainClassName = utils.formatClassName(
    "single-image-upload",
    gapClassName,
    shapeClassName,
    colorClassName,
    rootClassName
  );

  const groupClassName = utils.formatClassName(
    "upload-group",
    errorClassName,
    dragClassName,
    disabledClassName
  );

  // Set default image
  useEffect(() => {
    if (defaultImageUrl) setViewImage(defaultImageUrl);
  }, [defaultImageUrl]);

  // Generate view image
  useEffect(() => {
    if (!image) return;
    const reader = new FileReader();
    reader.onloadstart = () => setUploading(true);
    reader.onloadend = () => {
      setViewImage(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(image);
    setError(null);
  }, [image]);

  const errorMessage = () => {
    if (!error) return "";
    if (error.type === "fileSize")
      return lang.common.form.others.fileSize.replace(REPLACE_NUM_REGEX, `${limit / (1024 * 1024)}`);
    if (error.type === "fileType") {
      const types = fileAccepted.split(",").map((type) => type.replace("image/", ""));
      return lang.common.form.others.fileType.replace(REPLACE_TYPE_REGEX, `${types.join(", ")}`);
    }
  };

  const handleUpload = (imageFile: File) => {
    if (!fileAccepted.includes(imageFile.type)) return setError({ active: true, type: "fileType" });
    if (imageFile.size > limit) return setError({ active: true, type: "fileSize" });
    setImage(imageFile);
    onUpload?.(imageFile);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files ? e.target.files[0] : null;
    if (imageFile) handleUpload(imageFile);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragged(true);
    else if (e.type === "dragleave") setDragged(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imageFile = e.dataTransfer.files[0];
      handleUpload(imageFile);
    }
  };

  const handleRemove = () => {
    const inputEl = document.getElementById("singleUpload") as HTMLInputElement;
    if (image && inputEl && inputEl.files) {
      const fileTransfer = new DataTransfer();
      const uploadedImages: File[] = Array.from(inputEl.files);
      const filterImages: File[] = uploadedImages.filter((img) => img.name !== image.name);

      filterImages.forEach((file) => {
        const remainImage = new File([file.name], file.name);
        fileTransfer.items.add(remainImage);
      });

      inputEl.files = fileTransfer.files;
    }
    setViewImage("");
    setImage(null);
    onUpload?.(null);
  };

  return (
    <div style={rootStyle} className={mainClassName}>
      <div
        className={groupClassName}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!uploading ? (
          viewImage ? (
            <Image
              size="sm"
              objectFit="cover"
              src={viewImage}
              hasView={!controlDisabled}
              hasRemove={!controlDisabled}
              onRemove={handleRemove}
            />
          ) : (
            <Control
              {...restProps}
              ref={ref}
              id="singleUpload"
              controlClassName={controlClassName}
              disabled={controlDisabled}
              controlStyle={controlStyle}
              accept={fileAccepted}
              onChange={handleChange}
            />
          )
        ) : (
          <Loading />
        )}
      </div>

      {error && error.active && <NoteMessage type="error" message={errorMessage()} />}
    </div>
  );
};

export default forwardRef(SingleImageUpload);
