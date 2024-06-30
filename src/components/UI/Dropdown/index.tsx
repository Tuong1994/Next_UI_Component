"use client"

import {
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { DropdownItems } from "./type";
import { ComponentPlacement } from "@/common/type";
import { useRender, useClickOutside } from "@/hooks";
import utils from "@/utils";
import useLayout from "../Layout/useLayout";

type TriggerType = "click" | "hover";

export interface DropdownProps {
  rootClassName?: string;
  titleClassName?: string;
  dropdownClassName?: string;
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  dropdownStyle?: CSSProperties;
  children?: ReactNode | ReactNode[];
  placement?: Exclude<ComponentPlacement, "top" | "bottom">;
  defaultSelectedId?: string;
  items: DropdownItems;
  trigger?: TriggerType;
}

const Dropdown: ForwardRefRenderFunction<HTMLDivElement, DropdownProps> = (
  {
    rootClassName = "",
    titleClassName = "",
    dropdownClassName = "",
    style,
    titleStyle,
    dropdownStyle,
    children,
    items = [],
    placement = "left",
    trigger = "click",
    defaultSelectedId = "",
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [open, setOpen] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string>(defaultSelectedId);

  const render = useRender(open);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setOpen);

  const placementClassName = `dropdown-${placement}`;

  const openClassName = open ? "dropdown-wrap-active" : "";

  const hoverClassName = trigger === "hover" ? "dropdown-hover" : "";

  const themeClassName = `dropdown-${theme}`;

  const mainClassName = utils.formatClassName(
    "dropdown",
    placementClassName,
    hoverClassName,
    themeClassName,
    rootClassName
  );

  const dropdownTitleClassName = utils.formatClassName("dropdown-title", titleClassName);

  const dropdownListClassName = utils.formatClassName("dropdown-wrap", openClassName, dropdownClassName);

  useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

  const renderItems = () => {
    return items.map((item) => {
      const selectedClassName = selectedId === item.id ? "wrap-item-selected" : "";
      const itemClassName = utils.formatClassName("wrap-item", selectedClassName);
      return (
        <div key={item.id} className={itemClassName} onClick={() => setSelectedId(item.id)}>
          {item.label}
        </div>
      );
    });
  };

  const handleOpen = () => setOpen(!open);

  const handleClick = () => trigger === "click" && handleOpen();

  const handleHover = () => trigger === "hover" && handleOpen();

  return (
    <div
      ref={dropdownRef}
      style={style}
      className={mainClassName}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className={dropdownTitleClassName} style={titleStyle} onClick={handleClick}>
        {children}
      </div>

      {render && (
        <div style={dropdownStyle} className={dropdownListClassName}>
          {renderItems()}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Dropdown);
