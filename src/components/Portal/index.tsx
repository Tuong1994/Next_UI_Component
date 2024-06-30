'use client'

import { ReactNode, FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children?: ReactNode | ReactNode[];
}

const Portal: FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  });

  return mounted ? createPortal(children, document.querySelector("#portal") as Element) : null;
};

export default Portal;
