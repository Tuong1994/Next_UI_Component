import { useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";

type PaginationParams = {
  total: number;
  limit: number;
  currentPage: number;
  siblingCount: number;
};

export const DOTS = <BsThreeDots />;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = (args: PaginationParams) => {
  const { total, limit, currentPage, siblingCount = 1 } = args;

  const totalPages = Math.ceil(total / limit);

  const totalShowPages = siblingCount + 5;

  const paginationRange = useMemo(() => {
    if (totalShowPages > totalPages) return range(1, totalPages);

    const leftSiblingIdx = Math.max(currentPage - siblingCount, 1);

    const rightSiblingIdx = Math.min(currentPage + siblingCount, totalPages);

    const isShowLeftDot = leftSiblingIdx > 2;

    const isShowRightDot = rightSiblingIdx < totalPages - 2;

    const firstPageIdx = 1;

    const lastPageIdx = totalPages;

    if (!isShowLeftDot && isShowRightDot) {
      const leftItems = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItems);
      return [...leftRange, DOTS, lastPageIdx];
    }

    if (isShowLeftDot && !isShowRightDot) {
      const rightItems = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItems + 1, totalPages);
      return [firstPageIdx, DOTS, ...rightRange];
    }

    if (isShowLeftDot && isShowRightDot) {
      const middleRange = range(leftSiblingIdx, rightSiblingIdx);
      return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx];
    }

    return [];
  }, [total, limit, currentPage, siblingCount]);

  return { paginationRange, totalPages };
};

export default usePagination;
