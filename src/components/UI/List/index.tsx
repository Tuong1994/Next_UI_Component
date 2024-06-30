"use client"

import { HTMLAttributes, CSSProperties, ReactNode, FC, Ref, useContext, forwardRef } from "react";
import { FaCheck } from "react-icons/fa";
import ListContext, { ListContextState } from "./ListContext";
import utils from "@/utils";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  rootClassName?: string;
  headClassName?: string;
  contentClassName?: string;
  rootStyle?: CSSProperties;
  headStyle?: CSSProperties;
  head?: ReactNode | ReactNode[];
  icon?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
}

export const List: FC<ListProps> = forwardRef(
  (
    {
      rootClassName = "",
      headClassName = "",
      contentClassName = "",
      rootStyle,
      headStyle,
      head,
      icon = <FaCheck />,
      children,
      ...restProps
    },
    ref: Ref<HTMLUListElement>
  ) => {
    const initialValue: ListContextState = { icon };

    const mainClassName = utils.formatClassName("list", rootClassName);

    const listTitleClassName = utils.formatClassName("list-title", headClassName);

    const listContentClassName = utils.formatClassName("list-inner", contentClassName);

    return (
      <ListContext.Provider value={initialValue}>
        <div style={rootStyle} className={mainClassName}>
          {head && (
            <h4 style={headStyle} className={listTitleClassName}>
              {head}
            </h4>
          )}
          <ul ref={ref} {...restProps} className={listContentClassName}>
            {children}
          </ul>
        </div>
      </ListContext.Provider>
    );
  }
);

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  rootClassName?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  children?: ReactNode | ReactNode[];
}

export const ListItem: FC<ListItemProps> = forwardRef(
  (
    { rootClassName = "", contentClassName = "", contentStyle, children, ...restProps },
    ref: Ref<HTMLLIElement>
  ) => {
    const { icon } = useContext(ListContext);

    const mainClassName = utils.formatClassName("list-item", rootClassName);

    const listItemContentClassName = utils.formatClassName("item-content", contentClassName);

    return (
      <li ref={ref} {...restProps} className={mainClassName}>
        {icon && <div className="item-icon">{icon}</div>}
        <div style={contentStyle} className={listItemContentClassName}>
          {children}
        </div>
      </li>
    );
  }
);
