import { ComponentColor } from "@/common/type";

export type TypingTextColor = Exclude<ComponentColor, "black" | "white" | "gray">;
