"use client"

import {
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  useContext,
  useState,
  useEffect,
  forwardRef,
} from "react";
import {
  HiOutlineChevronDoubleLeft as ArrowDoubleLeft,
  HiOutlineChevronDoubleRight as ArrowDoubleRight,
  HiOutlineChevronLeft as ArrowLeft,
  HiOutlineChevronRight as ArrowRight,
} from "react-icons/hi2";
import { ComponentColor, ComponentShape } from "@/common/type";
import { GridAppContext } from "../Grid/Context";
import { useLang } from "@/hooks";
import usePagination from "./usePagination";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

export type PageType = "first" | "prev" | "page" | "next" | "last";

export interface PaginationProps {
  rootClassName?: string;
  style?: CSSProperties;
  total?: number;
  limit?: number;
  simple?: boolean;
  showContent?: boolean;
  ghost?: boolean;
  shape?: Exclude<ComponentShape, "circle">;
  color?: Exclude<ComponentColor, "white" | "gray">;
  firstIcon?: ReactNode | ReactNode[];
  lastIcon?: ReactNode | ReactNode[];
  prevIcon?: ReactNode | ReactNode[];
  nextIcon?: ReactNode | ReactNode[];
  onChangePage?: (page: number) => void;
}

const Pagination: ForwardRefRenderFunction<HTMLDivElement, PaginationProps> = (
  {
    rootClassName = "",
    style,
    simple,
    showContent,
    ghost,
    total = 100,
    limit = 10,
    color = "blue",
    shape = "round",
    firstIcon = <ArrowDoubleLeft />,
    lastIcon = <ArrowDoubleRight />,
    prevIcon = <ArrowLeft />,
    nextIcon = <ArrowRight />,
    onChangePage,
  },
  ref
) => {
  const { isPhone } = useContext(GridAppContext);

  const { layoutValue } = useLayout();

  const { lang } = useLang();

  const { layoutTheme: theme } = layoutValue;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { paginationRange: range, totalPages } = usePagination({
    total,
    limit,
    currentPage,
    siblingCount: 1,
  });

  const hasContent = showContent && !simple && !isPhone;

  const leftArrowDisabled = currentPage === 1;

  const rightArrowDisabled = currentPage === totalPages;

  const leftArrowDisabledClassName = leftArrowDisabled ? "actions-button-disabled" : "";

  const rightArrowDisabledClassName = rightArrowDisabled ? "actions-button-disabled" : "";

  const justifyClassName = hasContent ? "pagination-justify" : "";

  const colorClassName = ghost ? `pagination-ghost pagination-ghost-${color}` : `pagination-${color}`;

  const shapeClassName = `pagination-${shape}`;

  const themeClassName = `pagination-${theme}`;

  const mainClassName = utils.formatClassName(
    "pagination",
    justifyClassName,
    colorClassName,
    shapeClassName,
    themeClassName,
    rootClassName
  );

  const leftActionsClassName = utils.formatClassName("actions-button", leftArrowDisabledClassName);

  const rightActionsClassName = utils.formatClassName("actions-button", rightArrowDisabledClassName);

  useEffect(() => onChangePage?.(currentPage), [currentPage]);

  const renderPageButtons = () => {
    if (simple || isPhone)
      return (
        <div className="actions-content">
          {currentPage} / {totalPages}
        </div>
      );

    return range.map((item, idx) => {
      const activeClassName = currentPage === item ? "actions-button-active" : "";

      if (typeof item !== "number") {
        return (
          <div key={idx} className="actions-dot">
            {item}
          </div>
        );
      }

      return (
        <button
          key={idx}
          className={utils.formatClassName("actions-button", activeClassName)}
          onClick={() => handleChangePage("page", item)}
        >
          {item}
        </button>
      );
    });
  };

  const renderContent = () => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const from = start === 0 ? 1 : start;
    const to = end > total ? total : end;
    const { showing, of, result } = lang.common.pagination;
    return `${showing} ${from} - ${to} ${of} ${total} ${result}`;
  };

  const handleChangePage = (type: PageType, page?: number) => {
    switch (type) {
      case "first": {
        setCurrentPage(1);
        break;
      }
      case "prev": {
        setCurrentPage((prev) => prev - 1);
        break;
      }
      case "page": {
        if (page) setCurrentPage(page);
        break;
      }
      case "next": {
        setCurrentPage((prev) => prev + 1);
        break;
      }
      case "last": {
        setCurrentPage(totalPages);
        break;
      }
    }
  };

  if (totalPages === 1) return null;

  return (
    <div ref={ref} style={style} className={mainClassName}>
      {hasContent && <div className="pagination-content">{renderContent()}</div>}

      <div className="pagination-actions">
        <button
          disabled={leftArrowDisabled}
          className={leftActionsClassName}
          onClick={() => handleChangePage("first")}
        >
          {firstIcon}
        </button>

        <button
          disabled={leftArrowDisabled}
          className={leftActionsClassName}
          onClick={() => handleChangePage("prev")}
        >
          {prevIcon}
        </button>

        {renderPageButtons()}

        <button
          disabled={rightArrowDisabled}
          className={rightActionsClassName}
          onClick={() => handleChangePage("next")}
        >
          {nextIcon}
        </button>

        <button
          disabled={rightArrowDisabled}
          className={rightActionsClassName}
          onClick={() => handleChangePage("last")}
        >
          {lastIcon}
        </button>
      </div>
    </div>
  );
};

export default forwardRef(Pagination);
