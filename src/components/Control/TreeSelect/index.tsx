"use client";

import {
  FC,
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardedRef,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ControlColor, ControlShape, Option, SelectOptions, SelectRef } from "../type";
import { ComponentSize } from "@/common/type";
import { useFormContext } from "react-hook-form";
import { useRender, useClickOutside, useDetectBottom, useLang } from "@/hooks";
import SelectControl from "./Control";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import SelectOption from "./Option";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface TreeSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  addonBefore?: ReactNode | ReactNode[];
  addonAfter?: ReactNode | ReactNode[];
  emptyContent?: ReactNode | ReactNode[];
  options?: SelectOptions;
  defaultValue?: number | string;
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  total?: number;
  limit?: number;
  async?: boolean;
  loading?: boolean;
  required?: boolean;
  optional?: boolean;
  hasClear?: boolean;
  hasSearch?: boolean;
  onChangeSearch?: (text: string) => void;
  onChangeSelect?: (value: string | number | boolean) => void;
  onChangePage?: (page: number) => void;
  dropdownRender?: (menu: ReactNode) => ReactNode | ReactNode[];
}

const TreeSelect: FC<TreeSelectProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    sizes = "md",
    color = "blue",
    shape = "square",
    placeholder,
    disabled,
    options = [],
    defaultValue,
    total = 0,
    limit = 10,
    async = false,
    loading = false,
    hasClear = true,
    hasSearch = true,
    required,
    optional,
    emptyContent,
    onChangeSearch,
    onChangeSelect,
    onChangePage,
    dropdownRender,
    ...restProps
  },
  ref: ForwardedRef<SelectRef>
) => {
  const rhfMethods = useFormContext();

  const { layoutValue } = useLayout();

  const { lang } = useLang();

  const { layoutTheme: theme } = layoutValue;

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape, autoFocusValidation } = useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = useContext(FormItemContext);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [search, setSearch] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const [dropdown, setDropdown] = useState<boolean>(false);

  const [touched, setTouched] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const render = useRender(dropdown);

  const bottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setDropdown);

  useImperativeHandle(ref, () => ({
    el: inputRef.current as HTMLInputElement,
    onResetInput: handleClearInput,
  }));

  const totalPages = Math.ceil(total / limit);

  const triggerValidation = useCallback(() => {
    if (touched && !dropdown && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && !dropdown && rhfValue) rhfMethods.trigger(rhfName);
    if (touched && !dropdown) setTouched(false);
  }, [touched, dropdown, rhfMethods, rhfName, rhfValue]);

  // Trigger validation
  useEffect(() => {
    if (!isRhf) return;
    triggerValidation();
  }, [isRhf, triggerValidation]);

  // Set default option
  useEffect(() => {
    let defaultOption: Option | null = null;
    if (!isRhf) defaultOption = [...options].find((option) => option.value === defaultValue) as Option;
    else defaultOption = [...options].find((option) => option.value === rhfValue) as Option;
    setSelectedOption(defaultOption);
  }, [options.length, defaultValue, rhfValue, isRhf]);

  const controlPlaceHolder = useMemo(() => {
    if (placeholder) return placeholder;
    if (dropdown && hasSearch) return lang.common.form.placeholder.search;
    return lang.common.form.placeholder.select;
  }, [placeholder, dropdown]);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showClearIcon = Boolean((search || selectedOption) && hasClear && !controlDisabled);

  const showOptional = required ? false : optional;

  const themeClassName = `tree-select-${theme}`;

  const sizeClassName = `tree-select-${controlSize}`;

  const colorClassName = `tree-select-${controlColor}`;

  const shapeClassName = `tree-select-${controlShape}`;

  const bottomClassName = bottom ? "tree-select-bottom" : "";

  const disabledClassName = controlDisabled ? "tree-select-disabled" : "";

  const errorClassName = rhfError ? "tree-select-error" : "";

  const mainClassName = utils.formatClassName(
    "tree-select",
    colorClassName,
    sizeClassName,
    shapeClassName,
    bottomClassName,
    errorClassName,
    themeClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("tree-select-label", labelClassName);

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const renderValue = () => {
    if (search) return search;
    if (selectedOption) return selectedOption.label;
    return "";
  };

  const renderOptions = () => {
    if (async) return options;
    if (!search) return options;
    return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
    setTouched(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedOption(null);
    onChangeSearch?.(value);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearch("");
    onChangeSelect?.(option.value);
    if (isRhf) rhfMethods.setValue(rhfName, option.value);
  };

  const handleClearInput = () => {
    setTouched(true);
    if (search) setSearch("");
    if (selectedOption) setSelectedOption(null);
    if (isRhf) rhfMethods.setValue(rhfName, null);
    onChangeSelect?.("");
    onChangeSearch?.("");
  };

  const handleChangePage = (type: "prev" | "next") => {
    let page = currentPage;
    if (type === "prev") page -= 1;
    else page += 1;
    setCurrentPage(page);
    onChangePage?.(page);
  };

  return (
    <div ref={selectRef} style={rootStyle} className={mainClassName}>
      {label && (
        <label style={labelStyle} className={controlLabelClassName}>
          {required && <span className="label-required">*</span>}
          <span>{label}</span>
          {showOptional && <span className="label-optional">({lang.common.form.others.optional})</span>}
        </label>
      )}

      <div className="tree-select-wrap">
        <SelectControl
          {...restProps}
          ref={inputRef}
          autoFocusValidation={autoFocusValidation}
          inputClassName={inputClassName}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          loading={loading}
          rhfError={rhfError}
          dropdown={dropdown}
          readOnly={!hasSearch}
          controlDisabled={controlDisabled}
          placeholder={controlPlaceHolder}
          showClearIcon={showClearIcon}
          iconSize={iconSize}
          onChange={handleSearch}
          renderValue={renderValue}
          handleClearInput={handleClearInput}
          handleDropdown={handleDropdown}
        />

        {render && (
          <SelectOption
            async={async}
            loading={loading}
            dropdown={dropdown}
            selectedOption={selectedOption}
            currentPage={currentPage}
            totalPages={totalPages}
            emptyContent={emptyContent}
            options={renderOptions()}
            iconSize={iconSize}
            handleSelect={handleSelect}
            handleChangePage={handleChangePage}
            dropdownRender={dropdownRender}
          />
        )}
      </div>
    </div>
  );
};

export default forwardRef(TreeSelect);
