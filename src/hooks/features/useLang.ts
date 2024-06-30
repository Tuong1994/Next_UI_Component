import useLangStore from "@/store/LangStore";

const useLang = () => {
  const [lang, locale, switchLang] = useLangStore((state) => [state.lang, state.locale, state.switchLang]);
  return { lang, locale, switchLang };
};

export default useLang;
