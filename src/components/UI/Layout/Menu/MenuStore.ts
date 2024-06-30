import { create, StateCreator } from "zustand";

export const STORAGE_KEY = "menu_key";

interface MenuState {
  activeId: string[];
  setActiveId: (ids: string[]) => void;
}

const store: StateCreator<MenuState> = (set, get) => ({
  activeId: [],
  setActiveId: (ids: string[]) => {
    if (get().activeId.length) set((state) => ({ ...state, activeId: [] }));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    set((state) => ({ ...state, activeId: ids }));
  },
});

const useMenuStore = create(store);

export default useMenuStore;
