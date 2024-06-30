import { FC, useState, useRef, useEffect } from "react";
import { Option, SelectOptions } from "../type";
import { HiOutlineChevronDown as ArrowDown } from "react-icons/hi2";
import { useRender, useClickOutside } from "@/hooks";
import utils from "@/utils";

interface HeaderSelectProps {
  type: "month" | "year";
  options: SelectOptions;
  currentOption: number | string;
  onSelect?: (option: Option) => void;
}

const HeaderSelect: FC<HeaderSelectProps> = ({ type, options, currentOption, onSelect }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const selectRef = useRef<HTMLDivElement>(null);

  const render = useRender(dropdown);

  useClickOutside(selectRef, setDropdown);

  useEffect(() => {
    setSelectedOption([...options].find((option) => option.value === currentOption) as Option);
  }, [currentOption]);

  const dropdownClassName = dropdown ? "select-dropdown-active" : "";

  const handleDropdown = () => setDropdown(!dropdown);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setDropdown(false);
    onSelect?.(option);
  };

  return (
    <div ref={selectRef} className="control-select">
      <div className="select-box" onClick={handleDropdown}>
        <span className="box-value">{type === "year" ? currentOption : selectedOption?.label}</span>
        <ArrowDown className="box-icon" />
      </div>

      {render && (
        <div className={utils.formatClassName("select-dropdown", dropdownClassName)}>
          {options.map((option, idx) => (
            <div key={idx} className="dropdown-item" onClick={() => handleSelect(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSelect;
