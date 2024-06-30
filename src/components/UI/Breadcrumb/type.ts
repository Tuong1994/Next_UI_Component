import { ReactNode } from "react";

type BreadcrumbItem = {
  id: string;
  label: ReactNode | ReactNode[];
  actived?: boolean;
};

export type BreadcrumbItems = BreadcrumbItem[];
