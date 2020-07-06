import React from "react";

const Pagination = ({ locationPerPage, totalLocation, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLocation / locationPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination mb-0">
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className="page-item"
          >
            <a href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
