function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-between items-center mt-4 bg-slate-800 rounded-full">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border duration-300 cursor-pointer
        disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 rounded-full hover:text-white"
      >
        Prev
      </button>

      <span className="text-sm font-medium">
        Page {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border duration-300 cursor-pointer
        disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 rounded-full hover:text-white"
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;
