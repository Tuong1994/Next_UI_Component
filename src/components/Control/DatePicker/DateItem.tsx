import { FC } from "react";
import { SelectDate } from "../type";
import useSelectRange from "./useSelectRange";
import utils from "@/utils";

interface DateItemProps {
  min?: "today" | string;
  max?: "today" | string;
  currentDate: Date;
  selectDate: SelectDate;
  handleSelectDate: (date: SelectDate) => void;
}

const DateItem: FC<DateItemProps> = ({ min, max, currentDate, selectDate, handleSelectDate }) => {
  const selectRange = useSelectRange({ date: selectDate, min, max });

  const { className: disabledClassName, disabled } = selectRange;

  const isSelected =
    selectDate.date === currentDate.getDate() &&
    selectDate.month === currentDate.getMonth() &&
    selectDate.year === currentDate.getFullYear();

  const selectedClassName = isSelected ? "date-item-selected" : "";

  const subDateClassName = selectDate.type === "sub" ? "date-item-sub" : "";

  const className = utils.formatClassName(
    "date-item",
    selectedClassName,
    subDateClassName,
    disabledClassName
  );

  return (
    <div className={className}>
      <button
        disabled={disabled}
        type="button"
        className="item-btn"
        onClick={() => handleSelectDate(selectDate)}
      >
        {selectDate.date}
      </button>
    </div>
  );
};

export default DateItem;
