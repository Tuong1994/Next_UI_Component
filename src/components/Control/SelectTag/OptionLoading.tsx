import { FC } from "react";
import { FaSpinner } from "react-icons/fa";

interface OptionLoadingProps {}

const OptionLoading: FC<OptionLoadingProps> = () => {
  return (
    <div className="list-loading">
      <FaSpinner className="loading-icon" size={18} />
    </div>
  );
};

export default OptionLoading;
