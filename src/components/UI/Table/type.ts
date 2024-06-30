import { ReactNode } from "react";

type TableColumn<R = unknown> = {
  id: string;
  title: ReactNode | ReactNode[];
  dataIndex: keyof R;
  render?: (data: any, record: R, idx: number) => ReactNode | ReactNode[];
};

export type Columns<R = unknown> = TableColumn<R>[];
