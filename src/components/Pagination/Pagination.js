import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const Pagination = ({ pageLimit, totalRecords, onPageChanged }) => {
    const totalPages = Math.ceil(totalRecords / pageLimit);
    const [currentPage, setCurrentPage] = useState(1)
    console.log(`total pages: ${totalPages}`)

    const onNextPage = () => {
        setCurrentPage((currentPage) => {
            const newCurrent = currentPage !== totalPages ? currentPage + 1 : currentPage
            if (newCurrent !== currentPage)
                onPageChanged(newCurrent, (newCurrent - 1) * pageLimit, (newCurrent - 1) * pageLimit + pageLimit - 1)
            return newCurrent
        })
    }

    const onPreviousPage = () => {
        setCurrentPage((currentPage) => {
            const newCurrent = currentPage !== 1 ? currentPage - 1 : currentPage
            if (newCurrent !== currentPage)
                onPageChanged(newCurrent, (newCurrent - 1) * pageLimit, (newCurrent - 1) * pageLimit + pageLimit - 1)
            return newCurrent
        })
    }

    return (
        <div className="pagination">
            <NavigateBeforeIcon onClick={onPreviousPage} />
            <NavigateNextIcon onClick={onNextPage} />
        </div>
    )
}

export default Pagination
