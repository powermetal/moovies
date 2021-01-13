import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import './paginatedContainer.css';

const PaginatedContainer = ({ pageLimit, tabs, activeTab }) => {

    const getDefaultTab = () => {
        if (activeTab)
            return activeTab
        else
            return Object.keys(tabs)[0]
    }

    const getDisplayedContent = () => {
        return tabs[selectedTab ? selectedTab : getDefaultTab()].items.slice(0, pageLimit)
    }

    const [selectedTab, setSelectedTab] = useState(getDefaultTab())
    const [displayedContent, setDisplayedContent] = useState(getDisplayedContent())

    useEffect(() => {
        setDisplayedContent(getDisplayedContent())
    }, [selectedTab])

    const handlePageChange = (currentPage, from, to) => {
        setDisplayedContent(tabs[selectedTab].items.slice(from, to + 1))
    }

    const handleTabClicked = (tab) => {
        setSelectedTab(tab)
    }

    const handleActiveTab = (tab) => {
        if (tab === selectedTab)
            return "paginated_container__tab active"
        return "paginated_container__tab"
    }

    return (
        <div className="paginated_container">
            <div className="paginated_container__actions">
                <div>
                    {Object.entries(tabs).map(([k, tab]) => <button key={k} className={handleActiveTab(k)} onClick={e => handleTabClicked(k)}>{tab.label}</button>)}
                </div>
                {displayedContent.length > 0 ? <Pagination key={selectedTab} pageLimit={pageLimit} totalRecords={tabs[selectedTab].items.length} onPageChanged={handlePageChange} /> : null}
            </div>
            <div className="paginated_container__items">
                {displayedContent && displayedContent.map((item, index) => <div key={index} className="paginated_container__item">{item}</div>)}
                {displayedContent.length === 0 ? <p className="paginated_container__err">{tabs[selectedTab].errMessage}</p> : null}
            </div>
        </div >
    )
}

export default PaginatedContainer
