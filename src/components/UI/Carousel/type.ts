import { ReactNode } from "react";

type CarouselItem = {
  id: string;
  content?: ReactNode | ReactNode[];
  url?: string;
};

export type CarouselItems = CarouselItem[];
