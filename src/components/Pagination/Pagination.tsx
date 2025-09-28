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
    <div className="c-pagination table ml-auto mr-auto mt-15">
      <ol className="c-pagination__list flex justify-center items-center gap-x-3">
        {/* 前ページ */}
        <li className="c-pagination__item w-10 h-20">
          <button
            className={`c-pagination__link flex direction-col justify-center items-center arrow prev-arrow w-full h-full ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ background: "none", border: "none" }}
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

        {/* 最初のページ（省略記号がある場合） */}
        {visiblePages[0] > 1 && (
          <>
            <li className="c-pagination__item w-10 h-10 flex justify-center items-center">
              <button
                className="c-pagination__link flex justify-center items-center w-10 h-10 bg-gray-300 cursor-pointer"
                onClick={() => onPageChange(1)}
                style={{ background: "none", border: "1px solid #ccc" }}
              >
                1
              </button>
            </li>
            {visiblePages[0] > 2 && (
              <li className="c-pagination__item w-10 h-10 flex justify-center items-center">
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
            } w-10 h-10 flex justify-center items-center`}
          >
            <button
              className={`c-pagination__link flex justify-center items-center w-10 h-10 cursor-pointer ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => onPageChange(page)}
              style={{
                background: page === currentPage ? "#3b82f6" : "#d1d5db",
                color: page === currentPage ? "white" : "black",
                border: "1px solid #ccc",
              }}
            >
              {page}
            </button>
          </li>
        ))}

        {/* 最後のページ（省略記号がある場合） */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="c-pagination__item w-10 h-10 flex justify-center items-center">
                <span>...</span>
              </li>
            )}
            <li className="c-pagination__item w-10 h-10 flex justify-center items-center">
              <button
                className="c-pagination__link flex justify-center items-center w-10 h-10 bg-gray-300 cursor-pointer"
                onClick={() => onPageChange(totalPages)}
                style={{ background: "none", border: "1px solid #ccc" }}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* 次ページ */}
        <li className="c-pagination__item w-10 h-10">
          <button
            className={`c-pagination__link flex direction-col justify-center items-center arrow next-arrow w-10 h-10 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            style={{ background: "none", border: "none" }}
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
      </ol>
    </div>
  );
}
