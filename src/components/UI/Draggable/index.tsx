"use client"

import { CSSProperties, ReactNode, FC, TouchEvent, MouseEvent, useState, useRef } from "react";

export interface DraggableProps {
  rootClassName?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
}

const Draggable: FC<DraggableProps> = ({ rootClassName = "", style, children }) => {
  const [touchX, setTouchX] = useState<number>(0);

  const [touchY, setTouchY] = useState<number>(0);

  const [mouseX, setMouseX] = useState<number>(0);

  const [mouseY, setMouseY] = useState<number>(0);

  const [dragged, setDragged] = useState<boolean>(false);

  const dragElRef = useRef<HTMLDivElement>(null);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setDragged(true);
    setTouchX(e.touches[0].screenX - e.currentTarget.getBoundingClientRect().left);
    setTouchY(e.touches[0].screenY - e.currentTarget.getBoundingClientRect().top);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!dragged) return;
    if (dragElRef.current && dragElRef.current !== null) {
      const left = e.touches[0].screenX - touchX;
      const top = e.touches[0].screenY - touchY;
      dragElRef.current.style.left = `${left}px`;
      dragElRef.current.style.top = `${top}px`;
    }
  };

  const onTouchEnd = () => setDragged(false);

  const onMouseStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(true);
    setMouseX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setMouseY(e.screenY - e.currentTarget.getBoundingClientRect().top);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragged) return;
    if (dragElRef.current && dragElRef.current !== null) {
      const left = e.screenX - mouseX;
      const top = e.screenY - mouseY;
      dragElRef.current.style.left = `${left}px`;
      dragElRef.current.style.top = `${top}px`;
    }
  };

  const onMouseEnd = () => setDragged(false);

  return (
    <div
      ref={dragElRef}
      style={style}
      className={`draggable ${rootClassName}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseStart}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseEnd}
    >
      {children}
    </div>
  );
};

export default Draggable;
