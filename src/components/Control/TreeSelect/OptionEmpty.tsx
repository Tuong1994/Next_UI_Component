import { FC, ReactNode } from "react";
import { useLang } from "@/hooks";

interface OptionEmptyProps {
  emptyContent?: ReactNode | ReactNode[];
}

const OptionEmpty: FC<OptionEmptyProps> = ({ emptyContent }) => {
  const { lang } = useLang();

  return <div className="list-empty">{emptyContent ?? lang.common.form.others.emptyOptions}</div>;
};

export default OptionEmpty;
