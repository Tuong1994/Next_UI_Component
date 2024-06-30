import { Key, ReactNode, Fragment, useState } from "react";
import { TableColor } from ".";
import { Columns } from "./type";
import { CheckBox } from "@/components/Control";
import TableCell from "./TableCell";

interface TableBodyProps<M> {
  dataSource: M[];
  columns: Columns<M>;
  rowKey?: Key;
  rowSelectedKeys: Key[];
  color?: TableColor;
  hasRowSelection: boolean;
  hasRowExpand: boolean;
  handleSelectRow: (key: Key) => void;
  expandRowTable?: (data: M) => ReactNode | ReactNode[];
}

const TableBody = <M extends object>({
  dataSource = [],
  columns = [],
  rowKey,
  rowSelectedKeys,
  hasRowSelection,
  hasRowExpand,
  color = "blue",
  handleSelectRow,
  expandRowTable,
}: TableBodyProps<M>) => {
  const [expandedRow, setExpandedRow] = useState<Key>("");

  const expandClassName = (key: string) => (expandedRow === key ? "cell-expand-action-expanded" : "");

  const isSeleted = (key: string) => {
    if (rowSelectedKeys.includes(key)) return true;
    return false;
  };

  const handleExpand = (key: string) => {
    if (expandedRow === key) return setExpandedRow("");
    setExpandedRow(key);
  };

  return (
    <tbody>
      {dataSource.map((data, idx) => {
        const key = rowKey ? data[rowKey as keyof M] : `row-${idx}`;
        return (
          <Fragment key={key as Key}>
            <tr className={isSeleted(key as string) ? "table-row-selected" : ""}>
              {hasRowSelection && (
                <td>
                  <TableCell>
                    <CheckBox
                      color={color}
                      checked={isSeleted(key as string)}
                      onClick={() => handleSelectRow(key as string)}
                    />
                  </TableCell>
                </td>
              )}

              {hasRowExpand && (
                <td>
                  <TableCell>
                    <div
                      className={`cell-expand-action ${expandClassName(key as string)}`}
                      onClick={() => handleExpand(key as string)}
                    >
                      <div className="action-icon" />
                    </div>
                  </TableCell>
                </td>
              )}

              {columns.map((column) => (
                <td key={column.id}>
                  <TableCell>
                    {column.render
                      ? column.render(data[column.dataIndex], data, idx)
                      : (data[column.dataIndex] as ReactNode)}
                  </TableCell>
                </td>
              ))}
            </tr>

            {hasRowExpand && expandedRow === key && (
              <tr className="table-row-expand">
                <td />
                <td colSpan={columns.length + 1}>
                  <TableCell>{expandRowTable?.(data)}</TableCell>
                </td>
              </tr>
            )}
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default TableBody;
