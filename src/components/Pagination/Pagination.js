import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './pagination.css';

const countDisplayedElements = (currentPage, totalPages, totalRecords, pageLimit) => {
    const remainder = totalRecords % pageLimit
    return currentPage === totalPages && remainder !== 0 ? remainder : pageLimit
}

const Pagination = ({ pageLimit, totalRecords, onPageChanged }) => {
    const totalPages = Math.ceil(totalRecords / pageLimit);
    const [state, setState] = useState({ from: 0, to: countDisplayedElements(1, totalPages, totalRecords, pageLimit), currentPage: 1 })

    const calculateNextState = (prevState, newCurrent) => {
        const elementsInPage = countDisplayedElements(newCurrent, totalPages, totalRecords, pageLimit)

        return {
            currentPage: newCurrent
        }
    }

    const handlePageChanged = (currentPage, previousPage) => {
        if (currentPage !== previousPage)
            onPageChanged(currentPage, (currentPage - 1) * pageLimit, (currentPage - 1) * pageLimit + pageLimit - 1)
    }

    const onNextPage = () => {
        setState(prevState => {
            const newCurrent = prevState.currentPage !== totalPages ? prevState.currentPage + 1 : prevState.currentPage
            handlePageChanged(newCurrent, prevState.currentPage)
            return calculateNextState(prevState, newCurrent)
        })
    }

    const onPreviousPage = () => {
        setState(prevState => {
            const newCurrent = prevState.currentPage !== 1 ? prevState.currentPage - 1 : prevState.currentPage
            handlePageChanged(newCurrent, prevState.currentPage)
            return calculateNextState(prevState, newCurrent)
        })
    }

    return (
        <div className="pagination">
            <span>{state.currentPage} - {totalPages}</span>
            <NavigateBeforeIcon onClick={onPreviousPage} />
            <NavigateNextIcon onClick={onNextPage} />
        </div>
    )
}

export default Pagination
