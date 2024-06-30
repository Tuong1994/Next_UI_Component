import { FC } from "react";
import { Divider, Image } from "@/components/UI";
import { UploadItem, UploadItems } from "@/components/Control/type";

interface ViewAreaProps {
  title: string;
  items: UploadItems;
  controlDisabled: boolean | undefined;
  handleRemove?: (image: UploadItem) => void;
}

const ViewArea: FC<ViewAreaProps> = ({ title = "", controlDisabled, items = [], handleRemove }) => {
  return (
    <div className="upload-view-area">
      <Divider>{title}</Divider>
      <div className="area-images">
        {items.map((item) => (
          <Image
            key={item.id}
            src={item.url}
            size="sm"
            objectFit="cover"
            hasView={!controlDisabled}
            hasRemove={!controlDisabled}
            onRemove={() => handleRemove?.(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewArea;
