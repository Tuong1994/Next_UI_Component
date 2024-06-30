import { ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { Option, SelectOptions } from "../type";
import OptionItem from "./OptionItem";
import OptionPagination from "./OptionPagination";
import OptionEmpty from "./OptionEmpty";
import OptionLoading from "./OptionLoading";
import utils from "@/utils";

export interface SelectTagOptionProps {
  async: boolean;
  dropdown: boolean;
  loading: boolean;
  options: SelectOptions;
  selectedOptions: SelectOptions;
  currentPage: number;
  totalPages: number;
  emptyContent?: ReactNode | ReactNode[]
  iconSize: () => number | undefined;
  handleSelect: (option: Option) => void;
  handleChangePage: (type: "prev" | "next") => void;
  dropdownRender?: (menu: ReactNode) => ReactNode | ReactNode[];
}

const SelectTagOption: ForwardRefRenderFunction<HTMLDivElement, SelectTagOptionProps> = (
  {
    async,
    loading,
    dropdown,
    options = [],
    selectedOptions,
    currentPage,
    totalPages,
    emptyContent,
    iconSize,
    handleSelect,
    handleChangePage,
    dropdownRender,
  },
  ref
) => {
  const optionScrollClassName = options.length > 10 ? "option-list-scroll" : "";

  const dropdownClassName = dropdown ? "wrap-option-active" : "";

  const wrapClassName = utils.formatClassName("wrap-option", dropdownClassName);

  const listClassName = utils.formatClassName("option-list", optionScrollClassName);

  const isSelected = (option: Option) => selectedOptions.includes(option);

  const renderContent = () => {
    if (loading) return <OptionLoading />;
    if (!options.length) return <OptionEmpty emptyContent={emptyContent} />;
    const menu = options.map((option, idx) => (
      <OptionItem
        key={idx}
        option={option}
        iconSize={iconSize}
        isSelected={isSelected}
        handleSelect={handleSelect}
      />
    ));
    if (dropdownRender) return dropdownRender(menu);
    return menu;
  };

  return (
    <div ref={ref} className={wrapClassName}>
      <div className={listClassName}>{renderContent()}</div>

      {async && totalPages > 1 && (
        <OptionPagination
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

export default forwardRef(SelectTagOption);
