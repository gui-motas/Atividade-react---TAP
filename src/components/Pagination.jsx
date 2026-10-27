import Icon from "./Icon.jsx";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Paginação de cursos">
      <button
        className="page-arrow previous"
        aria-label="Página anterior"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="arrow" size={17} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}
      <button
        className="page-arrow"
        aria-label="Próxima página"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="arrow" size={17} />
      </button>
    </nav>
  );
}
