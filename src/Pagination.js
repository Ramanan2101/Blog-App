import React, { useContext } from 'react'
import ReactPaginate from 'react-paginate'
import DataContext from './context/DataContext'

const Pagination = () => {
    const {handlePageClick, pageCount} = useContext(DataContext)
  return (
    <div>
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
    </div>
  )
}

export default Pagination