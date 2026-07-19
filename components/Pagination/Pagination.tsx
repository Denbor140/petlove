"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  page,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const commonProps = {
    pageCount,
    forcePage: page - 1,
    onPageChange: ({ selected }: { selected: number }) =>
      onPageChange(selected + 1),
    marginPagesDisplayed: 0,
    previousLabel: (
      <svg width={24} height={24}>
        <use href="/icons.svg#icon-left"></use>
      </svg>
    ),
    nextLabel: (
      <svg width={24} height={24}>
        <use href="/icons.svg#icon-right"></use>
      </svg>
    ),
    containerClassName: css.pagination,
    pageClassName: css.page_item,
    pageLinkClassName: css.page_link,
    activeClassName: css.active,
    previousClassName: css.prev_item,
    nextClassName: css.next_item,
    disabledClassName: css.disabled,
    breakLabel: "...",
    breakClassName: css.break,
    breakLinkClassName: css.break_link,
  };

  return (
    <div className={css.pagination_wrapper}>
      <button
        type="button"
        className={css.first_page_btn}
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        aria-label="First page"
      >
        <span className={css.double_arrow}>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-left"></use>
          </svg>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-left"></use>
          </svg>
        </span>
      </button>

      <div className={css.mobile_only}>
        <ReactPaginate {...commonProps} pageRangeDisplayed={1} />
      </div>
      <div className={css.desktop_only}>
        <ReactPaginate {...commonProps} pageRangeDisplayed={3} />
      </div>

      <button
        type="button"
        className={css.last_page_btn}
        onClick={() => onPageChange(pageCount)}
        disabled={page === pageCount}
        aria-label="Last page"
      >
        <span className={css.double_arrow}>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-right"></use>
          </svg>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-right"></use>
          </svg>
        </span>
      </button>
    </div>
  );
}
