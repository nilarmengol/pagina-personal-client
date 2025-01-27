import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";

export default function Pagination({ posts, location, history }) {
  const currentPage = parseInt(posts.page);

  const onChangePage = newPage => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={posts.total}
      pageSize={posts.limit}
      onChange={newPage => onChangePage(newPage)}
      className="pagination"
    >
      MyComponent
    </PaginationAntd>
  );
}
