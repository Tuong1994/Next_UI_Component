"use client"

import {
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEvent,
  DragEvent,
  useContext,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { ControlColor, ControlShape, UploadError, UploadItem, UploadItems } from "@/components/Control/type";
import { ACCEPT_IMAGE_FILE_TYPE, DEFAULT_FILE_SIZE } from "../../constant";
import { REPLACE_NUM_REGEX, REPLACE_TYPE_REGEX } from "@/common/constant/regex";
import { NoteMessage } from "@/components/UI";
import { useLang } from "@/hooks";
import Control from "./Control";
import ViewArea from "./ViewArea";
import FormContext from "@/components/Control/Form/FormContext";
import utils from "@/utils";

export interface MultipleImageUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  controlClassName?: string;
  rootStyle?: CSSProperties;
  controlStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  limit?: number;
  maxUpload?: number;
  fileAccepted?: string;
  defaultImages?: string[];
  shape?: ControlShape;
  color?: ControlColor;
  onUpload?: (imageFiles: File[]) => void;
  onRemoveDefaultImages?: (image: UploadItem) => void;
}

const MultipleImageUpload: ForwardRefRenderFunction<HTMLInputElement, MultipleImageUploadProps> = (
  {
    rootClassName = "",
    controlClassName = "",
    rootStyle,
    controlStyle,
    label,
    shape = "square",
    color = "blue",
    maxUpload = 5,
    limit = DEFAULT_FILE_SIZE,
    fileAccepted = ACCEPT_IMAGE_FILE_TYPE.join(","),
    defaultImages = [],
    disabled,
    onUpload,
    onRemoveDefaultImages,
    ...restProps
  },
  ref
) => {
  const { lang } = useLang();

  const { isForm, color: rhfColor, shape: rhfShape, disabled: formDisabled } = useContext(FormContext);

  const [images, setImages] = useState<UploadItems>([]);

  const [viewImages, setViewImages] = useState<UploadItems>([]);

  const [defaultViewImages, setDefaultViewImages] = useState<UploadItems>([]);

  const [error, setError] = useState<UploadError | null>(null);

  const [dragged, setDragged] = useState<boolean>(false);

  const controlColor = isForm ? rhfColor : color;

  const controlShape = isForm ? rhfShape : shape;

  const controlDisabled = formDisabled ? formDisabled : disabled;

  const shapeClassName = `multiple-image-upload-${controlShape}`;

  const colorClassName = `multiple-image-upload-${controlColor}`;

  const gapClassName = isForm ? "multiple-image-upload-gap" : "";

  const dragClassName = dragged ? "upload-group-dragged" : "";

  const disabledClassName = controlDisabled ? "upload-group-disabled" : "";

  const errorClassName = error ? "upload-group-error" : "";

  const mainClassName = utils.formatClassName(
    "multiple-image-upload",
    gapClassName,
    shapeClassName,
    colorClassName,
    rootClassName
  );

  const groupClassName = utils.formatClassName(
    "upload-group",
    dragClassName,
    errorClassName,
    disabledClassName
  );

  // Set default images
  useEffect(() => {
    if (defaultImages.length)
      setDefaultViewImages(defaultImages.map((image) => ({ id: utils.uuid(), url: image })));
  }, [defaultImages.length]);

  // Generate view images
  useEffect(() => {
    const views: UploadItems = images.map((image) => ({
      id: image?.id,
      url: URL.createObjectURL(image?.file as File),
    }));
    setViewImages(views);
    setError(null);
    onUpload?.([...images].map((img) => img?.file as File));
  }, [images.length]);

  const errorMessage = () => {
    if (!error) return "";
    if (error.type === "fileSize")
      return lang.common.form.others.fileSize.replace(REPLACE_NUM_REGEX, `${limit / (1024 * 1024)}`);
    if (error.type === "fileMax")
      return lang.common.form.others.fileMax.replace(REPLACE_NUM_REGEX, `${maxUpload}`);
    if (error.type === "fileType") {
      const types = fileAccepted.split(",").map((type) => type.replace("image/", ""));
      return lang.common.form.others.fileType.replace(REPLACE_TYPE_REGEX, `${types.join(", ")}`);
    }
  };

  const handleUpload = (imageFiles: File[]) => {
    for (let i = 0; i < imageFiles.length; i++) {
      const image = imageFiles[i];
      if (!fileAccepted.includes(image.type)) return setError({ type: "fileType", active: true });
      if (image.size > limit) return setError({ type: "fileSize", active: true });
    }

    if (!viewImages.length) {
      if (imageFiles.length >= maxUpload) return setError({ type: "fileMax", active: true });
    } else {
      if (imageFiles.length + viewImages.length > maxUpload)
        return setError({ type: "fileMax", active: true });
    }

    const files: UploadItems = imageFiles.map((image) => ({ id: utils.uuid(), file: image }));
    if (!imageFiles.length) setImages(files);
    else setImages((prev) => [...prev, ...files]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageFiles: File[] = Array.from(e.target.files);
    handleUpload(imageFiles);
  };

  const handleDrag = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragged(true);
    else if (e.type === "dragleave") setDragged(false);
  };

  const handleDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);
    if (e.dataTransfer.files) {
      const imageFiles: File[] = Array.from(e.dataTransfer.files);
      handleUpload(imageFiles);
    }
  };

  const handleRemove = (image: UploadItem) => {
    const inputRef = document.getElementById("multipleUpload") as HTMLInputElement;
    if (images.length && inputRef && inputRef.files) {
      const fileTransfer = new DataTransfer();
      const UploadItems: File[] = Array.from(inputRef.files);
      const filterImages: File[] = UploadItems.filter((img) => img.name !== image.file?.name);

      filterImages.forEach((file) => {
        const remainFile = new File([file.name], file.name);
        fileTransfer.items.add(remainFile);
      });
      inputRef.files = fileTransfer.files;
    }
    setViewImages((prev) => [...prev].filter((img) => img.id !== image.id));
    setImages((prev) => [...prev].filter((img) => img.id !== image.id));
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
        <Control
          {...restProps}
          ref={ref}
          id="multipleUpload"
          label={label}
          controlClassName={controlClassName}
          controlStyle={controlStyle}
          accept={fileAccepted}
          disabled={controlDisabled}
          onChange={handleChange}
        />
      </div>

      {error?.active && <NoteMessage type="error" message={errorMessage()} />}

      {defaultViewImages.length > 0 && (
        <ViewArea
          title={lang.common.form.others.uploadedImg}
          items={defaultViewImages}
          controlDisabled={controlDisabled}
          handleRemove={onRemoveDefaultImages}
        />
      )}

      {viewImages.length > 0 && (
        <ViewArea
          title={lang.common.form.others.newUploadImg}
          items={viewImages}
          controlDisabled={controlDisabled}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default forwardRef(MultipleImageUpload);
