import { FC } from "react";
import { UploadItem, UploadItems } from "../../type";
import { HiTrash } from "react-icons/hi2";
import utils from "@/utils";

interface FileUploadItemsProps {
  files: UploadItems;
  controlDisabled: boolean | undefined;
  handleRemove: (file: UploadItem) => void;
}

const FileUploadItems: FC<FileUploadItemsProps> = ({ files = [], controlDisabled, handleRemove }) => {
  const disabledClassName = controlDisabled ? "items-inner-disabled" : "";

  const itemClassName = utils.formatClassName("items-inner", disabledClassName);

  return (
    <div className="upload-items">
      {files &&
        files.map((file) => {
          const { file: uploadFile, id } = file;
          return (
            <div key={id} className={itemClassName}>
              <span>{uploadFile?.name}</span>
              <HiTrash className="inner-icon" onClick={() => handleRemove(file)} />
            </div>
          );
        })}
    </div>
  );
};

export default FileUploadItems;
