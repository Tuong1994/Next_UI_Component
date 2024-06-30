"use client"

import { ForwardRefRenderFunction, HTMLAttributes, ReactNode, MouseEvent, forwardRef } from "react";
import { NavLinkColor } from "./type";
import { smoothScroll } from "./smoothScroll";
import useNavLink from "./useNavLink";
import utils from "@/utils";

export interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  rootClassName?: string;
  linkColor?: NavLinkColor;
  children?: ReactNode;
}

const NavLink: ForwardRefRenderFunction<HTMLAnchorElement, NavLinkProps> = (
  { rootClassName = "", children, id, linkColor = "blue", onClick, ...restProps },
  ref
) => {
  const colorClassName = `navlink-${linkColor}`;

  const className = utils.formatClassName("navlink", colorClassName, rootClassName);

  useNavLink();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    smoothScroll(e);
  };

  return (
    <a ref={ref} {...restProps} href={`#${id}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default forwardRef(NavLink);
