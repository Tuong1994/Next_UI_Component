"use client"

import {
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  TouchEvent,
  MouseEvent,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { CarouselItems } from "./type";
import {
  HiOutlineChevronLeft as ArrowLeft,
  HiOutlineChevronRight as ArrowRight,
  HiListBullet as List,
} from "react-icons/hi2";
import { useRender, useClickOutside } from "@/hooks";
import useCarousel from "./useCarousel";
import utils from "@/utils";

export interface CarouselProductProps {
  rootClassName?: string;
  style?: CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
  leftButtonIcon?: ReactNode | ReactNode[];
  rightButtonIcon?: ReactNode | ReactNode[];
  mode?: "dark" | "light";
}

const widthSpan = 100;

let interval: any;

const CarouselProduct: ForwardRefRenderFunction<HTMLDivElement, CarouselProductProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    hasManualStop,
    leftButtonIcon = <ArrowLeft size={30} />,
    rightButtonIcon = <ArrowRight size={30} />,
    items = [
      { id: "1", content: "Content 1" },
      { id: "2", content: "Content 2" },
      { id: "3", content: "Content 3" },
      { id: "4", content: "Content 4" },
      { id: "5", content: "Content 5" },
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

  const [showList, setShowList] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement>(null);

  const { translateFull, translatePartial, translateAnimation } = useCarousel({ items, slideId, slidePos });

  const render = useRender(showList);

  useClickOutside(listRef, setShowList);

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

  const showListClassName = showList ? "responsive-list-active" : "";

  const mainClassName = utils.formatClassName("carousel", "carousel-product", modeClassName, rootClassName);

  const leftActionClassName = utils.formatClassName("carousel-action", prevBtnDisabledClassName);

  const rightActionClassName = utils.formatClassName("carousel-action", nextBtnDisabledClassName);

  const jumpToSlide = (pos: number) => {
    setSlidePos(pos);
    translateFull(pos, "horizontal");
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
    translateFull(newPos, "horizontal");
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (isReSlide) newPos = 0;
    setSlidePos(newPos);
    translateFull(newPos, "horizontal");
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
    setTouchStartPos(e.touches[0].clientX);
    setTouchEndPos(e.touches[0].clientX);
    setTouched(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touched) return;
    setTouchEndPos(e.touches[0].clientX);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((touchEndPos - touchStartPos) / viewWidth) * widthSpan;
      translatePartial(translate, "horizontal");
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
    setMouseStartPos(e.clientX);
    setMouseEndPos(e.clientX);
    setClicked(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!clicked) return;
    setMouseEndPos(e.clientX);
    const viewWidth = document.getElementById("carouselView")?.offsetWidth;
    if (viewWidth) {
      const translate = ((mouseEndPos - mouseStartPos) / viewWidth) * widthSpan;
      translatePartial(translate, "horizontal");
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

  const renderList = () => {
    return items.map((item, idx) => {
      const itemActiveClassName = slidePos === idx ? "list-item-active" : "";
      return (
        <div
          key={item.id}
          className={utils.formatClassName("list-item", itemActiveClassName)}
          onClick={() => jumpToSlide(idx)}
        >
          {item.content}
        </div>
      );
    });
  };

  return (
    <div ref={ref} style={style} className={mainClassName}>
      <div className="product-list">{renderList()}</div>

      <div className="product-view">
        <button disabled={prevBtnDisabled} className={leftActionClassName} onClick={onPrev}>
          {leftButtonIcon}
        </button>
        <button disabled={nextBtnDisabled} className={rightActionClassName} onClick={onNext}>
          {rightButtonIcon}
        </button>
        <div className="view-slide">
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
        </div>
      </div>

      <div ref={listRef} className="product-list-responsive">
        <div className="responsive-label" onClick={() => setShowList(!showList)}>
          <List size={20} />
        </div>
        {render && (
          <div className={utils.formatClassName("responsive-list", showListClassName)}>{renderList()}</div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(CarouselProduct);
