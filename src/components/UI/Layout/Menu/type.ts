import { ReactNode } from "react";

export type MenuItem = {
  id: string;
  label: ReactNode | ReactNode[];
  icon?: ReactNode | ReactNode[];
  children?: MenuItem[];
};

export type MenuItems = MenuItem[];
