import { useEffect } from "react";

const useNavLink = () => {
  const handleScroll = () => {
    const contents = document.querySelectorAll(".navigate-content");
    const menuItems = document.querySelectorAll(".navlink");
    contents.forEach((content: any) => {
      const scrollY = window.scrollY;
      const top = content.offsetTop - 150;
      const height = content.offsetHeight;
      if (scrollY > top && scrollY < top + height) {
        menuItems.forEach((menu) => {
          menu.classList.remove("navlink-active");
          if (content.id)
            document.querySelector(`.navlink[href*=${content.id}]`)?.classList.add("navlink-active");
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
};

export default useNavLink;
