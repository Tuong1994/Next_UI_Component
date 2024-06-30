import {
  InputHTMLAttributes,
  ReactNode,
  ForwardRefRenderFunction,
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineChevronDown, HiXCircle } from "react-icons/hi2";
import { SelectOptions } from "../type";
import Tags from "./Tags";
import utils from "@/utils";

interface SelectTagControlProps extends InputHTMLAttributes<HTMLInputElement> {
  rhfError: boolean;
  dropdown: boolean;
  loading: boolean;
  autoFocusValidation?: boolean;
  inputClassName?: string;
  addonBefore?: ReactNode | ReactNode[];
  addonAfter?: ReactNode | ReactNode[];
  controlDisabled: boolean | undefined;
  showClearIcon: boolean;
  selectedOptions: SelectOptions;
  iconSize: () => number | undefined;
  renderValue: () => string;
  handleClearInput: () => void;
  handleDropdown: () => void;
}

const SelectTagControl: ForwardRefRenderFunction<HTMLInputElement, SelectTagControlProps> = (
  {
    rhfError,
    dropdown,
    loading,
    addonAfter,
    addonBefore,
    controlDisabled,
    showClearIcon,
    selectedOptions,
    inputClassName = "",
    autoFocusValidation = true,
    iconSize,
    renderValue,
    handleClearInput,
    handleDropdown,
    ...restProps
  },
  ref
) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const iconRotateClassName = dropdown ? "action-icon-rotate" : "";

  const controlInputClassName = utils.formatClassName("control-box", inputClassName);

  // Focus input when error is trigger
  useEffect(() => {
    if (!rhfError) return;
    if (autoFocusValidation) selectRef.current?.click();
  }, [rhfError, autoFocusValidation]);

  return (
    <div ref={selectRef} className="wrap-group" onClick={handleDropdown}>
      {addonBefore && <div className="group-addon group-addon-before">{addonBefore}</div>}

      <div className="group-control">
        <Tags selectedOptions={selectedOptions} />

        <input
          ref={ref}
          {...restProps}
          type="text"
          disabled={controlDisabled}
          value={renderValue()}
          className={controlInputClassName}
        />
        {showClearIcon && (
          <div className="control-action" onClick={handleClearInput}>
            <HiXCircle size={iconSize()} />
          </div>
        )}
        <div className="control-action">
          <HiOutlineChevronDown
            size={iconSize()}
            className={utils.formatClassName("action-icon", iconRotateClassName)}
          />
        </div>
      </div>

      {addonAfter && <div className="group-addon group-addon-after">{addonAfter}</div>}

      {loading && (
        <div className="group-loading">
          <FaSpinner className="loading-icon" />
        </div>
      )}
    </div>
  );
};

export default forwardRef(SelectTagControl);
