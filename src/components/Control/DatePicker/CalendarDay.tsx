import { FC } from "react";
import { ELang } from "@/common/enum";
import { useLang } from "@/hooks";
import { daysEn, daysVn } from "./data";

interface CalendarDayProps {}

const CalendarDay: FC<CalendarDayProps> = () => {
  const { locale } = useLang();

  const days = locale === ELang.EN ? daysEn : daysVn;

  return (
    <div className="calendar-day">
      {days.map((day, idx) => (
        <div key={idx} className="day-item">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarDay;
