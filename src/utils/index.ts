const utils = {
  uuid: () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x100000)
        .toString(16)
        .substring(1);
    return `${s4()}-${s4()}-${s4()}/${s4()}-${s4()}-${s4()}`;
  },

  collapse: (ref: React.RefObject<any>) => {
    if (!ref.current) return;
    if (ref.current === null) return;

    const node = ref.current;
    if (node.style.maxHeight) node.style.maxHeight = "";
    else node.style.maxHeight = `${node.scrollHeight}px`;
  },

  formatClassName: (...classNames: string[]) => {
    return classNames.filter((name) => name).join(" ");
  },
};

export default utils;
