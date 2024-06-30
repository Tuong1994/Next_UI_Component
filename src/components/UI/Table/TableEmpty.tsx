import { FC } from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

interface TableEmptyProps {}

const TableEmpty: FC<TableEmptyProps> = () => {
  return (
    <div className="table-empty">
      <HiOutlineArchiveBoxXMark size={35} />
      <span>No Data</span>
    </div>
  );
};

export default TableEmpty;
