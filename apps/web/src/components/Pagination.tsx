interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
          canGoPrev
            ? 'bg-neutral-700 text-white hover:bg-neutral-600'
            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
        }`}
      >
        Previous
      </button>
      <span className="text-neutral-400 text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
          canGoNext
            ? 'bg-neutral-700 text-white hover:bg-neutral-600'
            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  )
}
