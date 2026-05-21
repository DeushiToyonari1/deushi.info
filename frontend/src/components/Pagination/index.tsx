interface Props {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, totalPages, onPrev, onNext }: Props) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className="pagination" aria-label="ページネーション">
      <button
        className={`pagination__prev${!hasPrev ? ' pagination__prev--disabled' : ''}`}
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="前のページ"
      >
        ＜ 前へ
      </button>
      <button
        className={`pagination__next${!hasNext ? ' pagination__next--disabled' : ''}`}
        onClick={onNext}
        disabled={!hasNext}
        aria-label="次のページ"
      >
        次へ ＞
      </button>
    </nav>
  );
}
