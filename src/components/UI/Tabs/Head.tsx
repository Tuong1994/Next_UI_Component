import { FC } from "react";
import { TabsItem } from "./type";
import utils from "@/utils";

interface TabsHeadProps {
  item: TabsItem;
  tabActiveClassName: string;
  handleSelectTab: (id: string) => void;
}

const TabsHead: FC<TabsHeadProps> = ({ item, tabActiveClassName, handleSelectTab }) => {
  const className = utils.formatClassName("head-item", tabActiveClassName);

  return (
    <div className={className} onClick={() => handleSelectTab(item.id)}>
      <div className="item-inner">{item.title}</div>
    </div>
  );
};

export default TabsHead;
