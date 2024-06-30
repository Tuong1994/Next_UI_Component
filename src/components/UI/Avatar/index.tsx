"use client"

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, useState, useEffect, forwardRef } from "react";
import { HiUser } from "react-icons/hi2";
import { ComponentColor, ComponentShape } from "@/common/type";
import utils from "@/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  size?: number;
  letter?: string;
  badge?: string;
  dot?: boolean;
  color?: Exclude<ComponentColor, "white" | "gray">;
  shape?: Exclude<ComponentShape, "round">;
}

const Avatar: ForwardRefRenderFunction<HTMLDivElement, AvatarProps> = (
  {
    rootClassName = "",
    style,
    children,
    size = 30,
    shape = "circle",
    color = "blue",
    dot,
    badge,
    letter,
    ...restProps
  },
  ref
) => {
  const [iconSize, setIconSize] = useState<number>(18);

  const shapeClassName = `avatar-${shape}`;

  const colorClassName = !children ? `avatar-${color}` : "";

  const badgeRadiusClassName = badge && badge.length > 1 ? "avatar-badge-radius" : "";

  const inlineStyle = { ...style, width: `${size}px`, height: `${size}px` };

  const mainClassName = utils.formatClassName("avatar", colorClassName, shapeClassName, rootClassName);

  const badgeClassName = utils.formatClassName("avatar-badge", badgeRadiusClassName);

  useEffect(() => {
    setIconSize(18);
    if (size < 30 && size % 10 === 0) setIconSize((prev) => prev - 6);
    if (size > 30 && size % 10 === 0) setIconSize((prev) => prev + 6);
  }, [size]);

  const renderContent = () => {
    if (children) return children;
    if (letter) return letter.slice(0, 1);
    return <HiUser size={iconSize} />;
  };

  return (
    <div ref={ref} {...restProps} style={inlineStyle} className={mainClassName}>
      {badge && <div className={badgeClassName}>{badge}</div>}

      {dot && <div className="avatar-dot" />}

      <div className="avatar-content">{renderContent()}</div>
    </div>
  );
};

export default forwardRef(Avatar);
