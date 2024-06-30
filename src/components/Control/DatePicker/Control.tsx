import { ReactNode, FC } from "react";
import { HiCalendar, HiOutlineArrowPath } from "react-icons/hi2";
import moment from "moment";
import utils from "@/utils";

interface DatePickerControlProps {
  addonBefore?: ReactNode | ReactNode[];
  addonAfter?: ReactNode | ReactNode[];
  format: string;
  inputClassName: string;
  showResetIcon: boolean;
  selectedDate: Date | null;
  iconSize: () => number | undefined;
  handleResetInput: () => void;
  handleDropdown: () => void;
}

const DatePickerControl: FC<DatePickerControlProps> = ({
  addonBefore,
  addonAfter,
  inputClassName,
  showResetIcon,
  selectedDate,
  format,
  iconSize,
  handleResetInput,
  handleDropdown,
}) => {
  const controlInputClassName = utils.formatClassName("control-box", inputClassName);

  return (
    <div className="wrap-group" onClick={handleDropdown}>
      {addonBefore && <div className="group-addon group-addon-before">{addonBefore}</div>}

      <div className="group-control">
        <div className={controlInputClassName}>{moment(selectedDate).format(format)}</div>

        {showResetIcon && (
          <div className="control-action" onClick={handleResetInput}>
            <HiOutlineArrowPath size={iconSize()} />
          </div>
        )}

        <div className="control-action">
          <HiCalendar size={iconSize()} />
        </div>
      </div>

      {addonAfter && <div className="group-addon group-addon-after">{addonAfter}</div>}
    </div>
  );
};

export default DatePickerControl;
