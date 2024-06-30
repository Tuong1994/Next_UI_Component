import { useState, useEffect } from "react";

const useViewpoint = () => {
  if (typeof window === "undefined")
    return { screenWidth: 0, isPhone: false, isTablet: false, isLaptop: false, isDesktop: false };

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isPhone = screenWidth >= 320 && screenWidth <= 480;

  const isTablet = screenWidth > 480 && screenWidth <= 768;

  const isLaptop = screenWidth > 768 && screenWidth <= 1100;

  const isDesktop = screenWidth > 1100;

  return { screenWidth, isPhone, isTablet, isLaptop, isDesktop };
};

export default useViewpoint;
