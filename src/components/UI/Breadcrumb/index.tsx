"use client"

import { CSSProperties, HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { BreadcrumbItems } from "./type";
import { HiChevronRight } from "react-icons/hi2";
import utils from "@/utils";
import useLayout from "../Layout/useLayout";

export interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  items?: BreadcrumbItems;
  separator?: ReactNode | ReactNode[];
}

const Breadcrumb: ForwardRefRenderFunction<HTMLDivElement, BreadcrumbProps> = (
  {
    rootClassName = "",
    itemClassName = "",
    itemStyle,
    items = [],
    separator = <HiChevronRight size={14} />,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const themeClassName = `breadcrumb-${theme}`;

  const mainClassName = utils.formatClassName("breadcrumb", themeClassName, rootClassName);

  const breadCrumbItemClassName = utils.formatClassName("breadcrumb-item", itemClassName);

  const renderItems = () => {
    return items.map((item, idx) => {
      const activeClassName = item.actived ? "item-label-active" : "";
      return (
        <div key={item.id} style={itemStyle} className={breadCrumbItemClassName}>
          <div className={utils.formatClassName("item-label", activeClassName)}>{item.label}</div>
          {idx !== items.length - 1 && <div className="item-separator">{separator}</div>}
        </div>
      );
    });
  };

  return (
    <div ref={ref} {...restProps} className={mainClassName}>
      {renderItems()}
    </div>
  );
};

export default forwardRef(Breadcrumb);
