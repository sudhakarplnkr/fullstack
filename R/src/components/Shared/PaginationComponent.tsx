import * as React from 'react';
import 'react-fa';
import { PageRequest } from '../../typings/ApiClient';

type IPaginationProp = {
  PageRequest?: PageRequest;
  TotalNumberOfRecord: number;
  OnPageChange(pageNumber: number): void;
};

const PaginationComponent = (props: IPaginationProp) => {
  if (!props.PageRequest || props.TotalNumberOfRecord <= props.PageRequest.perPageCount) {
    return null;
  }
  const lastPageCount = props.TotalNumberOfRecord % props.PageRequest.perPageCount;
  const numberOfPages = Math.floor(props.TotalNumberOfRecord / props.PageRequest.perPageCount) + (lastPageCount > 0 ? 1 : 0);
  const isLastPage = props.PageRequest.pageNumber === numberOfPages;
  const previousCount = (props.PageRequest.pageNumber - 1) * props.PageRequest.perPageCount;
  const fromCount = previousCount + 1;
  const toCount = previousCount + (isLastPage ? lastPageCount : props.PageRequest.perPageCount);

  const renderPageIndex = () => {
    if (props.PageRequest) {
      let pages = [];
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(
          <li key={i} className="page-item hand-pointer" onClick={() => props.OnPageChange(i)} >
            <span className={`page-link ' ${(i === props.PageRequest.pageNumber ? 'active' : '')}`}>{i}</span>
          </li >);
      }
      return pages;
    }
    return null;
  };
  return (
    <div className="col-sm-12 pagination-bottom-space">
      <div className="col-sm-6">
        <div className="pagination-bottom-text-space">
          Showing {fromCount} to {toCount} of {props.TotalNumberOfRecord} entries
          </div>
      </div>
      <div className="col-sm-6">
        <nav aria-label="navigation" className="pull-right">
          <ul className="pagination">
            <li className="page-item hand-pointer" onClick={() => props.PageRequest && (props.PageRequest.pageNumber !== 1) && props.OnPageChange(props.PageRequest.pageNumber - 1)}> <span className="page-link">Previous</span></li>
            {renderPageIndex()}
            < li className="page-item hand-pointer" onClick={() => props.PageRequest && !isLastPage && props.OnPageChange(props.PageRequest.pageNumber + 1)}><span className="page-link">Next</span></li>
          </ul>
        </nav>
      </div>
    </div >
  );
};
export default PaginationComponent;