import { CSSProperties, FC, useState, useEffect } from "react";
import { MenuItem } from "../type";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Tooltip } from "@/components/UI";
import { LayoutColor } from "../../Context";
import useLayoutStore from "../../LayoutStore";
import utils from "@/utils";

interface MenuVerticalItemProps {
  item: MenuItem;
  depth: number;
  activeId: string[];
  itemClassName?: string;
  itemStyle?: CSSProperties;
  color?: LayoutColor;
  handleSelectMenu: (id: string) => void;
}

const MenuVerticalItem: FC<MenuVerticalItemProps> = ({
  item,
  depth,
  activeId,
  itemClassName = "",
  itemStyle,
  color = "blue",
  handleSelectMenu,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const shrinked = useLayoutStore((state) => state.shrinked);

  const isRoot = depth === 0;

  const hasChild = item.children && item.children.length > 0;

  const actived = hasChild ? open : activeId.includes(item.id);

  const showTooltipContent = shrinked && isRoot && !hasChild;

  const rootLabelClassName = isRoot ? "item-label-root" : "";

  const rootChildClassName =
    isRoot && !open ? "item-children-root" : "item-children-root item-children-root-active";

  const labelActiveClassName = actived && !hasChild ? "item-label-active" : "";

  const childActiveClassName = actived && hasChild ? "item-children-active" : "";

  const iconActiveClassName = actived && hasChild ? "label-arrow-active" : "";

  const shrinkClassName = shrinked ? "vertical-item-shrinked" : "";

  const mainClassName = utils.formatClassName("vertical-item", shrinkClassName, itemClassName);

  const tooltipTitleClassName = utils.formatClassName("item-label", rootLabelClassName, labelActiveClassName);

  const itemChildClassName = utils.formatClassName("item-children", rootChildClassName, childActiveClassName);

  useEffect(() => {
    if (shrinked && open) setOpen(false);
  }, [shrinked]);

  const handleOpen = (e: any) => {
    if (e.type === "click") return hasChild ? setOpen(!open) : handleSelectMenu(item.id);
    if (shrinked && isRoot) setOpen(!open);
  };

  return (
    <div style={itemStyle} className={mainClassName} onMouseEnter={handleOpen} onMouseLeave={handleOpen}>
      <Tooltip
        placement="right"
        color={color}
        label={showTooltipContent ? item.label : ""}
        rootClassName="item-tooltip-wrap"
        titleClassName={tooltipTitleClassName}
        onClick={handleOpen}
      >
        <div className="label-content">
          {item.icon && <div className="content-icon">{item.icon}</div>}
          <div className="content-text">{item.label}</div>
        </div>

        {hasChild && (
          <div className={utils.formatClassName("label-arrow", iconActiveClassName)}>
            <HiOutlineChevronDown className="arrow-icon" />
          </div>
        )}
      </Tooltip>

      {hasChild && (
        <div className={itemChildClassName}>
          {item.children &&
            item.children.map((item) => (
              <MenuVerticalItem
                key={item.id}
                item={item}
                color={color}
                depth={depth + 1}
                activeId={activeId}
                itemStyle={itemStyle}
                itemClassName={itemClassName}
                handleSelectMenu={handleSelectMenu}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuVerticalItem;
