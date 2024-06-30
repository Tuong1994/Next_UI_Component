import { FC, useState, useEffect } from "react";
import { SelectDate } from "../type";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import CalendarDate from "./CalenderDate";
import utils from "@/utils";

interface DatePickerCalendarProps {
  min?: "today" | string;
  max?: "today" | string;
  dropdown: boolean;
  selectedDate: Date;
  handleSelect: (date: SelectDate) => void;
}

const DatePickerCalender: FC<DatePickerCalendarProps> = ({
  min,
  max,
  dropdown,
  selectedDate,
  handleSelect,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());

  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const dropdownClassName = dropdown ? "wrap-calendar-active" : "";

  const className = utils.formatClassName("wrap-calendar", dropdownClassName);

  useEffect(() => {
    setCurrentDate(selectedDate);
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const handleSelectMonth = (month: number) => setCurrentMonth(month);

  const handleSelectYear = (year: number) => setCurrentYear(year);

  const handleSwitchMonth = (type: "prev" | "next") => {
    const newMonth = type === "prev" ? currentMonth - 1 : currentMonth + 1;
    setCurrentMonth(newMonth);
    if (newMonth < 0 || newMonth > 11) {
      const newDate = new Date(currentYear, newMonth, new Date().getDate());
      setCurrentDate(newDate);
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
    } else setCurrentDate(new Date());
  };

  const handleSelectDate = (date: SelectDate) => {
    const newDate = date.fullDate;
    if (date.month < currentMonth || date.month > currentMonth) {
      setCurrentDate(newDate);
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
    } else setCurrentDate(newDate);
    handleSelect(date);
  };

  return (
    <div className={className}>
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        handleSelectMonth={handleSelectMonth}
        handleSelectYear={handleSelectYear}
        handleSwitchMonth={handleSwitchMonth}
      />

      <CalendarDay />

      <CalendarDate
        min={min}
        max={max}
        currentDate={currentDate}
        currentYear={currentYear}
        currentMonth={currentMonth}
        handleSelectDate={handleSelectDate}
      />
    </div>
  );
};

export default DatePickerCalender;
