// src/components/Pagination/Pagination.tsx
import React from "react";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) {
  // 表示するページ番号の範囲を計算
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // 総ページ数が最大表示数以下の場合、すべて表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 現在のページを中心に表示範囲を決定
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // 末尾に合わせて開始ページを調整
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="c-pagination">
      <ol className="c-pagination__list">
        {/* 前ページ */}
        {currentPage > 1 && (
          <li className="c-pagination__item">
            <button
              className="c-pagination__link arrow prev-arrow"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <Image
                src="/common/icon-prev-arrow.svg"
                alt="前のページ"
                width={20}
                height={15}
                className="c-pagination__arrow"
              />
            </button>
          </li>
        )}

        {/* 最初のページ（省略記号がある場合） */}
        {visiblePages[0] > 1 && (
          <>
            <li className="c-pagination__item">
              <button
                className="c-pagination__link"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
            {visiblePages[0] > 2 && (
              <li className="c-pagination__item">
                <span>...</span>
              </li>
            )}
          </>
        )}

        {/* ページ番号 */}
        {visiblePages.map((page) => (
          <li
            key={page}
            className={`c-pagination__item ${
              page === currentPage ? "current" : ""
            }`}
          >
            <button
              className={`c-pagination__link ${
                page === currentPage ? "current" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* 最後のページ（省略記号がある場合） */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="c-pagination__item">
                <span>...</span>
              </li>
            )}
            <li className="c-pagination__item">
              <button
                className="c-pagination__link"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* 次ページ */}
        {currentPage < totalPages && (
          <li className="c-pagination__item">
            <button
              className="c-pagination__link arrow next-arrow"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <Image
                src="/common/icon-next-arrow.svg"
                alt="次のページ"
                width={20}
                height={15}
                className="c-pagination__arrow"
              />
            </button>
          </li>
        )}
      </ol>
    </div>
  );
}
