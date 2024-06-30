import { FC } from "react";
import { SelectDate } from "../type";
import DateItem from "./DateItem";
import useDateRange from "./useDateRange";

interface CalendarDateProps {
  min?: "today" | string;
  max?: "today" | string;
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
  handleSelectDate: (date: SelectDate) => void;
}

const CalendarDate: FC<CalendarDateProps> = ({
  min,
  max,
  currentDate,
  currentMonth,
  currentYear,
  handleSelectDate,
}) => {
  const dateRange = useDateRange(currentYear, currentMonth);

  return (
    <div className="calendar-date">
      {dateRange.map((selectDate, idx) => (
        <DateItem
          key={idx}
          min={min}
          max={max}
          currentDate={currentDate}
          selectDate={selectDate}
          handleSelectDate={handleSelectDate}
        />
      ))}
    </div>
  );
};

export default CalendarDate;
