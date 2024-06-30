import { useMemo } from "react";
import { SelectDate } from "../type";

type Params = {
  date: SelectDate;
  min?: "today" | string;
  max?: "today" | string;
};

const DISABLED_CLASSNAME = "date-item-disabled";

const useSelectRange = (args: Params) => {
  const { date, min, max } = args;

  const selectRange = useMemo(() => {
    let className: string = "";
    let disabled: boolean = false;

    const newDate = new Date();
    const minDate = min ? new Date(min).getTime() : 0;
    const maxDate = max ? new Date(max).getTime() : 0;
    const selectedDate = date.fullDate.getTime();
    const today = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).getTime();

    //  Case 1: min and max are not defined
    if (!min && !max) return { className, disabled };

    //  Case 2: min is defined and max not defined
    if (min && !max) {
      if (min === "today" && selectedDate < today) {
        className = DISABLED_CLASSNAME;
        disabled = true;
      }

      if (selectedDate < minDate) {
        className = DISABLED_CLASSNAME;
        disabled = true;
      }
    }

    //  Case 3: max is defined and min not defined
    if (!min && max) {
      if (max === "today" && selectedDate > today) {
        className = DISABLED_CLASSNAME;
        disabled = true;
      }

      if (selectedDate > maxDate) {
        className = DISABLED_CLASSNAME;
        disabled = true;
      }
    }

    //  Case 4: both max and min are defined
    if (min && max) {
      // both max and min value are "today"
      if (max === "today" && min === "today" && selectedDate !== today) {
        className = DISABLED_CLASSNAME;
        disabled = true;
      }

      // max value is "today" and min value are specific date
      if (max === "today" && min !== "today") {
        if (selectedDate > today || selectedDate < minDate) {
          className = DISABLED_CLASSNAME;
          disabled = true;
        }
      }

      // min value is "today" and max value are specific date
      if (max !== "today" && min === "today") {
        if (selectedDate < today || selectedDate > maxDate) {
          className = DISABLED_CLASSNAME;
          disabled = true;
        }
      }

      // both max and min value are specific date
      if (selectedDate < minDate || selectedDate > maxDate) {
        className = DISABLED_CLASSNAME;
        disabled = true;
      }
    }

    return { className, disabled };
  }, [date, min, max]);

  return selectRange;
};

export default useSelectRange;
