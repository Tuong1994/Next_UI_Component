import { ONLY_DIGIT_REGEX } from "../regex";

const formatNumber = (value: string) => {
  if (!value) return value;
  const number = value.replace(ONLY_DIGIT_REGEX, "");
  const { format } = new Intl.NumberFormat("vn");
  return format(Number(number));
};

export default formatNumber;
