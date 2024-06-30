"use client"

import { CSSProperties, ForwardRefRenderFunction, useContext, useState, forwardRef } from "react";
import { MenuItems } from "../type";
import LayoutContext, { LayoutColor } from "../../Context";
import MenuHorizontalItem from "./Item";
import utils from "@/utils";

export interface MenuHorizontalProps {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  items?: MenuItems;
  color?: LayoutColor;
  defaultActiveId?: string[];
  onSelectMenu?: (id: string) => void;
}

const MenuHorizontal: ForwardRefRenderFunction<HTMLDivElement, MenuHorizontalProps> = (
  {
    rootClassName = "",
    itemClassName,
    itemStyle,
    items = [],
    color = "blue",
    defaultActiveId = [],
    onSelectMenu,
    ...restProps
  },
  ref
) => {
  const { layouted, color: layoutColor } = useContext(LayoutContext);

  const [activeIds, setActiveIds] = useState<string[]>([]);

  const colorClassName = `menu-horizontal-${layouted ? layoutColor : color}`;

  const layoutClassName = layouted ? "menu-horizontal-layout" : "";

  const className = utils.formatClassName("menu-horizontal", colorClassName, layoutClassName, rootClassName);

  const handleOpenMenu = (id: string) => {
    const idx = activeIds.indexOf(id);
    if (idx === -1) setActiveIds((prev) => [...prev, id]);
    else setActiveIds((prev) => [...prev].filter((active) => active !== id));
    onSelectMenu?.(id);
  };

  return (
    <div ref={ref} {...restProps} className={className}>
      {items.map((item) => (
        <MenuHorizontalItem
          key={item.id}
          item={item}
          activeIds={activeIds}
          itemClassName={itemClassName}
          itemStyle={itemStyle}
          handleOpenMenu={handleOpenMenu}
        />
      ))}
    </div>
  );
};

export default forwardRef(MenuHorizontal);
