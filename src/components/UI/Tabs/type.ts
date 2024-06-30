import { ReactNode } from "react";

export type TabsItem = {
  id: string;
  title: ReactNode | ReactNode[];
  content: ReactNode | ReactNode[];
};

export type TabsItems = TabsItem[];
