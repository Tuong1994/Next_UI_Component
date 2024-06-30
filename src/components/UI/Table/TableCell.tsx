import { ReactNode, FC } from "react";

interface TableCellProps {
  children?: ReactNode | ReactNode[];
}

const TableCell: FC<TableCellProps> = ({ children }) => {
  return <div className="table-cell">{children}</div>;
};

export default TableCell;
