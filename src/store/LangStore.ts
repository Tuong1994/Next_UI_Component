import { create, StateCreator } from "zustand";
import { Lang } from "@/common/type";
import { ELang } from "@/common/enum";
import en from "@/common/lang/en";
import vn from "@/common/lang/vn";

interface LangState {
  lang: Lang;
  locale: ELang;
  switchLang: (locale: ELang) => void;
}

const store: StateCreator<LangState> = (set) => ({
  lang: en,
  locale: ELang.EN,
  switchLang: (locale: ELang) => {
    if (locale === ELang.EN) return set((state) => ({ ...state, locale, lang: en }));
    set((state) => ({ ...state, locale, lang: vn }));
  },
});

const useLangStore = create(store);

export default useLangStore;
