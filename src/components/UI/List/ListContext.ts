import { ReactNode, createContext } from "react";

export type ListContextState = {
  icon?: ReactNode | ReactNode[];
};

const ListContext = createContext<ListContextState>({});

export default ListContext;
