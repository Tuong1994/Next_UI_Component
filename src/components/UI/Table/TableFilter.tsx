import { ReactNode, FC } from "react";
import { Space, Button, Grid } from "@/components/UI";
import type { TableColor } from ".";
import type { ButtonProps } from "../Button";

const { Row, Col } = Grid;

export interface TableFilterProps {
  color: TableColor;
  filter?: ReactNode | ReactNode[];
  filterButtonTitle?: ReactNode | ReactNode[];
  cancelFilterButtonTitle?: ReactNode | ReactNode[];
  filterButtonProps?: ButtonProps;
  cancelFilterButtonProps?: ButtonProps;
  hasFilterButton?: boolean;
  hasCancelFilterButton?: boolean;
  onFilter?: () => void;
  onCancelFilter?: () => void;
}

const TableFilter: FC<TableFilterProps> = ({
  color,
  filter,
  filterButtonTitle = "Filter",
  cancelFilterButtonTitle = "Cancel",
  filterButtonProps,
  cancelFilterButtonProps,
  hasFilterButton = true,
  hasCancelFilterButton = true,
  onFilter,
  onCancelFilter,
}) => {
  const filterButtonDefaultProps: ButtonProps = {
    sizes: "sm",
    color,
    onClick: onFilter,
    ...filterButtonProps,
  };

  const cancelFilterButtonDefaultProps: ButtonProps = {
    sizes: "sm",
    ghost: true,
    onClick: onCancelFilter,
    ...cancelFilterButtonProps,
  };

  return (
    <Row rootClassName="table-filter">
      {filter}
      <Col>
        <Space align="middle">
          {hasFilterButton && <Button {...filterButtonDefaultProps}>{filterButtonTitle}</Button>}
          {hasCancelFilterButton && (
            <Button {...cancelFilterButtonDefaultProps}>{cancelFilterButtonTitle}</Button>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default TableFilter;
