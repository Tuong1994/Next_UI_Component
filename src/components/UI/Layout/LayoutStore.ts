import { StateCreator, create } from "zustand";
import { LayoutTheme } from "./Context";


interface LayoutState {
  layoutTheme: LayoutTheme;
  shrinked: boolean;
  show: boolean;
  resizeContent: boolean;
  onShrinked: () => void;
  onResizeContent: () => void;
  onShowSide: () => void;
  onHideSide: () => void;
  onSwitchTheme: (theme: LayoutTheme) => void;
}

const store: StateCreator<LayoutState> = (set) => ({
  layoutTheme: "light",
  shrinked: false,
  show: false,
  resizeContent: false,
  onShrinked: () => set((state) => ({ ...state, shrinked: !state.shrinked })),
  onResizeContent: () => set((state) => ({ ...state, resizeContent: true })),
  onShowSide: () => set((state) => ({ ...state, show: true })),
  onHideSide: () => set((state) => ({ ...state, show: false })),
  onSwitchTheme: (theme: LayoutTheme) => set((state) => ({ ...state, layoutTheme: theme })),
});

const useLayoutStore = create(store);

export default useLayoutStore;
