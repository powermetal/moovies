import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'

const PaginatedContainer = ({ items, pageLimit }) => {
    const [displayedContent, setDisplayedContent] = useState({
        items: items,
        displayedItems: items.slice(0, pageLimit)
    })

    const handlePageChange = (currentPage, from, to) => {
        setDisplayedContent({ ...displayedContent, displayedItems: displayedContent.items.slice(from, to + 1) })
        console.log(`from, to: ${from} ${to}`)
    }

    return (
        <div>
            <Pagination pageLimit={pageLimit} totalRecords={items.length} onPageChanged={handlePageChange} />
            {displayedContent.displayedItems.map(item => <div>{item}</div>)}
        </div>
    )
}

export default PaginatedContainer
