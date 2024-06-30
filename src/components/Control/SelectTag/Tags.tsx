import { FC } from "react";
import { SelectOptions } from "../type";

interface TagsProps {
  selectedOptions: SelectOptions;
}

const Tags: FC<TagsProps> = ({ selectedOptions }) => {
  const renderContent = () => {
    if (selectedOptions.length === 1) return selectedOptions[0].label;
    return `${selectedOptions.length} +`;
  };

  return selectedOptions.length ? <div className="control-tags">{renderContent()}</div> : null;
};

export default Tags;
