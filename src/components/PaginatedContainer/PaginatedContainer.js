import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import './paginatedContainer.css';

const PaginatedContainer = ({ items = [], pageLimit, tabs = [], onTabClicked }) => {
    const [displayedContent, setDisplayedContent] = useState([])
    const [selectedTab, setSelectedTab] = useState(tabs[0].value)

    useEffect(() => setDisplayedContent(items.slice(0, pageLimit)), [items])

    const handlePageChange = (currentPage, from, to) => {
        setDisplayedContent(items.slice(from, to + 1))
    }


    const handleTabClicked = (tab) => {
        onTabClicked(tab.value)
        setSelectedTab(tab.value)
    }

    const activeTab = (tab) => {
        if (tab.value === selectedTab)
            return "paginated_container__tab active"
        return "paginated_container__tab"
    }

    return (
        <div className="paginated_container">
            <div className="paginated_container__actions">
                <div>
                    {tabs.map(tab => <button className={activeTab(tab)} onClick={e => handleTabClicked(tab)}>{tab.label}</button>)}
                </div>
                <Pagination key={selectedTab} pageLimit={pageLimit} totalRecords={items.length} onPageChanged={handlePageChange} />
            </div>
            <div className="paginated_container__items">
                {displayedContent && displayedContent.map(item => <div className="paginated_container__item">{item}</div>)}
            </div>
        </div >
    )
}

export default PaginatedContainer
