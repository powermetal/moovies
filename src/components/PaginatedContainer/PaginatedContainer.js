import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import './paginatedContainer.css';

const PaginatedContainer = ({ items = [], pageLimit, tabs = [{ value: '' }], onTabClicked, errMessage }) => {
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
                    {tabs.map(tab => tab.value.length > 0 ? <button className={activeTab(tab)} onClick={e => handleTabClicked(tab)}>{tab.label}</button> : null)}
                </div>
                {displayedContent.length > 0 ? <Pagination key={selectedTab} pageLimit={pageLimit} totalRecords={items.length} onPageChanged={handlePageChange} /> : null}
            </div>
            <div className="paginated_container__items">
                {displayedContent && displayedContent.map(item => <div className="paginated_container__item">{item}</div>)}
                {!displayedContent.length > 0 ? <p className="paginated_container__err">{errMessage}</p> : null}
            </div>
        </div >
    )
}

export default PaginatedContainer
