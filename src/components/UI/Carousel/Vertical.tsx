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
import { HiOutlineChevronUp as ArrowUp, HiOutlineChevronDown as ArrowDown } from "react-icons/hi2";
import useCarousel from "./useCarousel";
import utils from "@/utils";

export interface CarouselVerticalProps {
  rootClassName?: string;
  style?: CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  hasArrow?: boolean;
  hasManualStop?: boolean;
  upButtonIcon?: ReactNode | ReactNode[];
  downButtonIcon?: ReactNode | ReactNode[];
  mode?: "dark" | "light";
}

const heightSpan = 100;

let interval: any;

const CarouselVertical: ForwardRefRenderFunction<HTMLDivElement, CarouselVerticalProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    hasArrow = true,
    hasManualStop,
    upButtonIcon = <ArrowUp size={30} />,
    downButtonIcon = <ArrowDown size={30} />,
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

  const { translateFull, translatePartial, translateAnimation } = useCarousel({ items, slideId, slidePos });

  useEffect(() => {
    if (autoPlay) {
      if (manualStop && !clicked && !touched) {
        interval = setInterval(() => handleNextSlide(), time);
      }
    }
    return () => clearInterval(interval);
  });

  const modeClassName = `carousel-${mode}`;

  const isReSlide = infinite || autoPlay;

  const prevBtnDisabled = !isReSlide && slidePos === 0;

  const nextBtnDisabled = !isReSlide && slidePos === items.length - 1;

  const prevBtnDisabledClassName = prevBtnDisabled ? "carousel-action-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "carousel-action-disabled" : "";

  const mainClassName = utils.formatClassName("carousel", "carousel-vertical", modeClassName, rootClassName);

  const leftActionClassName = utils.formatClassName("carousel-action", prevBtnDisabledClassName);

  const rightActionClassName = utils.formatClassName("carousel-action", nextBtnDisabledClassName);

  const jumpToSlide = (pos: number) => {
    setSlidePos(pos);
    translateFull(pos, "vertical");
  };

  const handleManualStop = () => {
    clearInterval(interval);
    if (hasManualStop) setManualStop(false);
  };

  const handlePrevSlide = () => {
    let newPos = slidePos;
    if (newPos > 0) newPos -= 1;
    else if (isReSlide) newPos = items.length - 1;
    setSlidePos(newPos);
    translateFull(newPos, "vertical");
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (isReSlide) newPos = 0;
    setSlidePos(newPos);
    translateFull(newPos, "vertical");
  };

  const onPrev = () => {
    handlePrevSlide();
    handleManualStop();
  };

  const onNext = () => {
    handleNextSlide();
    handleManualStop();
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartPos(e.touches[0].clientY);
    setTouchEndPos(e.touches[0].clientY);
    setTouched(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touched) return;
    setTouchEndPos(e.touches[0].clientY);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((touchEndPos - touchStartPos) / viewWidth) * heightSpan;
      translatePartial(translate, "vertical");
      setTouchSwiped(true);
    }
  };

  const onTouchEnd = () => {
    if (!touchSwiped) return;
    if (touchEndPos - touchStartPos > 75) handlePrevSlide();
    else if (touchEndPos - touchStartPos < -75) handleNextSlide();
    else jumpToSlide(slidePos);
    setManualStop(true);
    setTouched(false);
    setTouchSwiped(false);
    translateAnimation("slow");
  };

  const onMouseStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMouseStartPos(e.clientY);
    setMouseEndPos(e.clientY);
    setClicked(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!clicked) return;
    setMouseEndPos(e.clientY);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((mouseEndPos - mouseStartPos) / viewWidth) * heightSpan;
      translatePartial(translate, "vertical");
      setMouseSwiped(true);
    }
  };

  const onMouseEnd = () => {
    if (!mouseSwiped) return;
    if (mouseEndPos - mouseStartPos > 100) handlePrevSlide();
    else if (mouseEndPos - mouseStartPos < -100) handleNextSlide();
    else jumpToSlide(slidePos);
    setManualStop(true);
    setClicked(false);
    setMouseSwiped(false);
    translateAnimation("slow");
  };

  const renderItems = () => {
    return items.map((item, idx) => (
      <div key={item.id} id={`${slideId}-${idx}`} className="view-item">
        {item.content}
      </div>
    ));
  };

  const renderDots = () => {
    return items.map((item, idx) => {
      const dotActiveClassName = slidePos === idx ? "dots-item-active" : "";
      return (
        <div
          key={item.id}
          className={utils.formatClassName("dots-item", dotActiveClassName)}
          onClick={() => jumpToSlide(idx)}
        />
      );
    });
  };

  return (
    <div ref={ref} style={style} className={mainClassName}>
      {hasArrow && (
        <button disabled={prevBtnDisabled} className={leftActionClassName} onClick={onPrev}>
          {upButtonIcon}
        </button>
      )}
      {hasArrow && (
        <button disabled={nextBtnDisabled} className={rightActionClassName} onClick={onNext}>
          {downButtonIcon}
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
        {renderItems()}
      </div>
      <div className="carousel-dots">{renderDots()}</div>
    </div>
  );
};

export default forwardRef(CarouselVertical);
