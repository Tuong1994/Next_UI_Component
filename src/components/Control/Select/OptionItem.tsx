import { FC } from "react";
import { Option } from "../type";
import { HiCheck } from "react-icons/hi2";
import utils from "@/utils";

interface OptionItemProps {
  option: Option;
  iconSize: () => number | undefined;
  isSelected: (option: Option) => boolean;
  handleSelect: (option: Option) => void;
}

const OptionItem: FC<OptionItemProps> = ({ option, isSelected, handleSelect, iconSize }) => {
  const selectedClassName = isSelected(option) ? "list-item-selected" : "";

  const itemClassName = utils.formatClassName("list-item", selectedClassName);

  return (
    <div className={itemClassName} onClick={() => handleSelect(option)}>
      <div className="item-label">
        {option.icon && <div className="label-icon">{option.icon}</div>}
        <div>{option.label}</div>
      </div>
      {isSelected(option) && <HiCheck size={iconSize()} />}
    </div>
  );
};

export default OptionItem;
