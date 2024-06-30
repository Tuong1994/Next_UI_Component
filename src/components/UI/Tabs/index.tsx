"use client"

import { HTMLAttributes, CSSProperties, ForwardRefRenderFunction, useState, forwardRef } from "react";
import { TabsItems } from "./type";
import { ComponentColor } from "@/common/type";
import TabsHead from "./Head";
import utils from "@/utils";
import useLayout from "../Layout/useLayout";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  headClassName?: string;
  contentClassName?: string;
  style?: CSSProperties;
  headStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  items: TabsItems;
  defaultActiveId?: string;
  color?: Exclude<ComponentColor, "black" | "white" | "gray">;
  onSelectTab?: (id: string) => void;
}

const Tabs: ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
  {
    rootClassName = "",
    headClassName = "",
    contentClassName = "",
    style,
    headStyle,
    contentStyle,
    color = "blue",
    items = [],
    defaultActiveId,
    onSelectTab,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [tabActive, setTabActive] = useState<string>(defaultActiveId ?? items[0]?.id);

  const colorClassName = `tabs-${color}`;

  const themeClassName = `tabs-${theme}`;

  const mainClassName = utils.formatClassName("tabs", colorClassName, themeClassName, rootClassName);

  const tabsHeadClassName = utils.formatClassName("tabs-head", headClassName);

  const tabsContentClassName = utils.formatClassName("tabs-content", contentClassName);

  const handleSelectTab = (id: string) => {
    setTabActive(id);
    onSelectTab?.(id);
  };

  const renderTitles = () => {
    return items.map((item) => {
      const tabActiveClassName = tabActive === item.id ? "head-item-active" : "";
      const commonProps = { item, tabActiveClassName, handleSelectTab };
      return <TabsHead key={item.id} {...commonProps} />;
    });
  };

  const renderContents = () => {
    return items.map((item) => {
      const actived = tabActive === item.id;
      const tabActiveClassName = actived ? "content-item-active" : "";
      if (actived) {
        return (
          <div key={item.id} className={utils.formatClassName("content-item", tabActiveClassName)}>
            {item.content}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div ref={ref} style={style} {...restProps} className={mainClassName}>
      <div style={headStyle} className={tabsHeadClassName}>
        {renderTitles()}
      </div>

      <div style={contentStyle} className={tabsContentClassName}>
        {renderContents()}
      </div>
    </div>
  );
};

export default forwardRef(Tabs);
