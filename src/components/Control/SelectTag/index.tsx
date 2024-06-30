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
import { useFormContext } from "react-hook-form";
import { ComponentSize } from "@/common/type";
import { ControlColor, ControlShape, Option, SelectOptions, SelectRef } from "../type";
import { useRender, useClickOutside, useDetectBottom, useLang } from "@/hooks";
import SelectTagControl from "./Control";
import SelectOption from "./Option";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface SelectTagProps extends InputHTMLAttributes<HTMLInputElement> {
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
  defaultTags?: any[];
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
  onChangeSelect?: (tags: any[]) => void;
  onChangePage?: (page: number) => void;
  dropdownRender?: (menu: ReactNode) => ReactNode | ReactNode[];
}

const SelectTag: FC<SelectTagProps> = (
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
    defaultTags = [],
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

  const [selectedOptions, setSelectedOptions] = useState<SelectOptions>([]);

  const [dropdown, setDropdown] = useState<boolean>(false);

  const [touched, setTouched] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const render = useRender(dropdown);

  const bottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setDropdown);

  useImperativeHandle(ref, () => {
    const handleResetInput = () => {
      setTouched(true);
      setSelectedOptions([]);
      if (search) setSearch("");
    };
    return {
      el: inputRef.current as HTMLInputElement,
      onResetInput: handleResetInput,
    };
  });

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
    if (!isRhf) return setSelectedOptions(defaultOptions([...defaultTags]));
    setSelectedOptions(defaultOptions([...rhfValue]));
  }, [defaultTags.length, rhfValue, isRhf]);

  const controlPlaceHolder = useMemo(() => {
    if (placeholder) return placeholder;
    if (dropdown && hasSearch) return lang.common.form.placeholder.search;
    return lang.common.form.placeholder.select;
  }, [placeholder, dropdown]);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showClearIcon = Boolean(hasClear && search && !controlDisabled);

  const showOptional = required ? false : optional;

  const themeClassName = `select-${theme}`;

  const sizeClassName = `select-${controlColor}`;

  const colorClassName = `select-${controlSize}`;

  const shapeClassName = `select-${controlShape}`;

  const bottomClassName = bottom ? "select-bottom" : "";

  const disabledClassName = controlDisabled ? "select-disabled" : "";

  const errorClassName = rhfError ? "select-error" : "";

  const mainClassName = utils.formatClassName(
    "select",
    colorClassName,
    sizeClassName,
    shapeClassName,
    bottomClassName,
    errorClassName,
    themeClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("select-label", labelClassName);

  const defaultOptions = (tags: any[]) => {
    return [...options].filter((option) => {
      if (tags.includes(option.value)) return option;
    }) as SelectOptions;
  };

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const renderValue = () => {
    if (search) return search;
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
    onChangeSearch?.(value);
  };

  const handleSelect = (option: Option) => {
    let selectedItems = [...selectedOptions];

    const idx = selectedItems.findIndex((item) => item.value === option.value);
    if (idx === -1) selectedItems = [...selectedItems, option];
    else selectedItems = selectedItems.filter((item) => item.value !== option.value);

    setSelectedOptions(selectedItems);
    setSearch("");

    const tags = [...selectedItems].map((option) => option?.value);
    if (!isRhf) return onChangeSelect?.(tags);
    else rhfMethods.setValue(rhfName, tags);
  };

  const handleClearInput = () => {
    setTouched(true);
    if (search) setSearch("");
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

      <div className="select-wrap">
        <SelectTagControl
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
          selectedOptions={selectedOptions}
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
            selectedOptions={selectedOptions}
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

export default forwardRef(SelectTag);
