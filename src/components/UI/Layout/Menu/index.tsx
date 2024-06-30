import { CSSProperties, ForwardRefRenderFunction, Fragment, forwardRef } from "react";
import { MenuItems } from "./type";
import { LayoutColor } from "../Context";
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

type MenuType = "horizontal" | "vertical";

export interface LayoutMenuProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  items?: MenuItems;
  type?: MenuType;
  color?: LayoutColor;
  defaultActiveId?: string[];
  onSelectMenu?: (id: string) => void;
}

const LayoutMenu: ForwardRefRenderFunction<HTMLDivElement, LayoutMenuProps> = (
  { type = "horizontal", color = "blue", defaultActiveId = [], onSelectMenu, ...restProps },
  ref
) => {
  const commonProps = { ref, color, defaultActiveId, ...restProps };

  return (
    <Fragment>
      {type === "horizontal" && <Horizontal {...commonProps} />}
      {type === "vertical" && <Vertical {...commonProps} />}
    </Fragment>
  );
};

export default forwardRef(LayoutMenu);
