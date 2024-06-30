"use client"

import {
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  TouchEvent,
  MouseEvent,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { CarouselItems } from "./type";
import { HiOutlineChevronLeft as ArrowLeft, HiOutlineChevronRight as ArrowRight } from "react-icons/hi2";
import useCarousel from "./useCarousel";
import utils from "@/utils";

export interface CarouselSlickProps {
  rootClassName?: string;
  style?: CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  hasArrow?: boolean;
  hasManualStop?: boolean;
  leftButtonIcon?: ReactNode | ReactNode[];
  rightButtonIcon?: ReactNode | ReactNode[];
  mode?: "dark" | "light";
}

const widthSpan = 100;

let interval: any;

const CarouselSlick: ForwardRefRenderFunction<HTMLDivElement, CarouselSlickProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    hasManualStop,
    hasArrow = true,
    leftButtonIcon = <ArrowLeft size={30} />,
    rightButtonIcon = <ArrowRight size={30} />,
    items = [
      { id: "1", content: "Content 1" },
      { id: "2", content: "Content 2" },
      { id: "3", content: "Content 3" },
    ],
  },
  ref
) => {
  const [slidePos, setSlidePos] = useState<number>(0);

  const [touchStartPos, setTouchStartPos] = useState<number>(0);
  const [touchEndPos, setTouchEndPos] = useState<number>(0);
  const [touched, setTouched] = useState<boolean>(false);
  const [touchSwiped, setTouchSwiped] = useState<boolean>(false);

  const [mouseStartPos, setMouseStartPos] = useState<number>(0);
  const [mouseEndPos, setMouseEndPos] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);
  const [mouseSwiped, setMouseSwiped] = useState<boolean>(false);

  const [manualStop, setManualStop] = useState<boolean>(time !== undefined);

  const modeClassName = `carousel-${mode}`;

  const isReSlide = infinite || autoPlay;

  const prevBtnDisabled = !isReSlide && slidePos === 0;

  const nextBtnDisabled = !isReSlide && slidePos === items.length - 1;

  const prevBtnDisabledClassName = prevBtnDisabled ? "carousel-action-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "carousel-action-disabled" : "";

  const mainClassName = utils.formatClassName("carousel", "carousel-slick", modeClassName, rootClassName);

  const leftActionClassName = utils.formatClassName("carousel-action");

  const rightActionClassName = utils.formatClassName("carousel-action");

  const translate = (pos: number) => {
    const el = document.getElementById("viewSlide");
    if (el) el.style.transform = `translateX(${pos}px)`;
  };

  const handlePrevSlide = () => {
    translate(-50);
  };

  const handleNextSlide = () => {
    translate(50);
  };

  const onPrev = () => {
    handlePrevSlide();
  };

  const onNext = () => {
    handleNextSlide();
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {};

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {};

  const onTouchEnd = () => {};

  const onMouseStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onMouseEnd = () => {};

  return (
    <div ref={ref} style={style} className={mainClassName}>
      {hasArrow && (
        <button className={leftActionClassName} onClick={onPrev}>
          {leftButtonIcon}
        </button>
      )}
      {hasArrow && (
        <button className={rightActionClassName} onClick={onNext}>
          {rightButtonIcon}
        </button>
      )}
      <div
        id="carouselView"
        className="carousel-view"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseStart}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseEnd}
        onMouseLeave={onMouseEnd}
      >
        <div id="viewSlide" className="view-slide">
          {[...Array(10)].map((_, idx) => (
            <div key={idx} className="slide-item"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(CarouselSlick);
