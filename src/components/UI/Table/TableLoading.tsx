import { FC } from "react";
import Spinner from "@/components/UI/Loading/Spinner";

const TableLoading: FC<{}> = () => {
  return (
    <div className="table-loading">
      <Spinner size={6} type="bubble" color="black" />
    </div>
  );
};

export default TableLoading;
