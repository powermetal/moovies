import React, { useState, useEffect } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './pagination.css';

const Pagination = ({ pageLimit, totalRecords, onPageChanged }) => {
    const totalPages = Math.ceil(totalRecords / pageLimit);
    const [state, setState] = useState({ currentPage: 1, previousPage: 1 })

    const calculateNextState = (prevState, newCurrent) => {
        return {
            currentPage: newCurrent,
            previousPage: prevState.currentPage
        }
    }

    useEffect(() => {
        handlePageChanged(state.currentPage, state.previousPage)
    }, [state])

    const handlePageChanged = (currentPage, previousPage) => {
        if (currentPage !== previousPage)
            onPageChanged(currentPage, (currentPage - 1) * pageLimit, (currentPage - 1) * pageLimit + pageLimit - 1)
    }

    const onNextPage = () => {
        setState(prevState => {
            const newCurrent = prevState.currentPage !== totalPages ? prevState.currentPage + 1 : prevState.currentPage
            return calculateNextState(prevState, newCurrent)
        })
    }

    const onPreviousPage = () => {
        setState(prevState => {
            const newCurrent = prevState.currentPage !== 1 ? prevState.currentPage - 1 : prevState.currentPage
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
