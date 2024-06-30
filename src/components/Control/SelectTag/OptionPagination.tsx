import { FC } from "react";
import { HiOutlineChevronRight as ArrowRight, HiOutlineChevronLeft as ArrowLeft } from "react-icons/hi2";
import utils from "@/utils";

interface OptionPaginationProps {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  handleChangePage: (type: "prev" | "next") => void;
}

const OptionPagination: FC<OptionPaginationProps> = ({
  currentPage,
  totalPages,
  loading,
  handleChangePage,
}) => {
  const prevBtnDisabled = currentPage === 1 || loading;

  const nextBtnDisabled = currentPage === totalPages || loading;

  const prevBtnDisabledClassName = prevBtnDisabled ? "actions-btn-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "actions-btn-disabled" : "";

  const leftActionClassName = utils.formatClassName("actions-btn", prevBtnDisabledClassName);

  const rightActionClassName = utils.formatClassName("actions-btn", nextBtnDisabledClassName);

  return (
    <div className="option-pagination">
      <div className="pagination-content">
        {currentPage} / {totalPages}
      </div>
      <div className="pagination-actions">
        <button
          type="button"
          disabled={prevBtnDisabled}
          className={leftActionClassName}
          onClick={() => handleChangePage("prev")}
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          disabled={nextBtnDisabled}
          className={rightActionClassName}
          onClick={() => handleChangePage("next")}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default OptionPagination;
