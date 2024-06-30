import { ReactNode } from "react";

export type DropdownItem = {
  id: string;
  label: ReactNode | ReactNode[];
};

export type DropdownItems = DropdownItem[];
