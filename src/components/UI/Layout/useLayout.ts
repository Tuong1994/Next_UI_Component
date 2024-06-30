import useLayoutStore from "./LayoutStore";

const useLayout = () => {
  const [layoutTheme, shrinked, show, resizeContent] = useLayoutStore((state) => [
    state.layoutTheme,
    state.shrinked,
    state.show,
    state.resizeContent,
  ]);
  const [onShrinked, onResizeContent, onShowSide, onHideSide, onSwitchTheme] = useLayoutStore((state) => [
    state.onShrinked,
    state.onResizeContent,
    state.onShowSide,
    state.onHideSide,
    state.onSwitchTheme,
  ]);
  const layoutValue = { layoutTheme, shrinked, show, resizeContent };
  const layoutApi = { onShrinked, onResizeContent, onShowSide, onHideSide, onSwitchTheme };
  return { layoutValue, layoutApi };
};

export default useLayout;
