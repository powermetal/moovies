import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import './MovieList.css';
import { Link } from 'react-router-dom';

const MovieList = ({ items }) => {

    const pageLimit = 8

    const getDefaultState = () => {
        return Object.entries(items).find(([k, i]) => i.default)[0]
    }

    const [tab, setTab] = useState(getDefaultState)

    const getDisplayedContent = () => {
        return items[tab ? tab : getDefaultState()].movies.slice(0, pageLimit)
    }

    const [displayedContent, setDisplayedContent] = useState(getDisplayedContent())

    useEffect(() => {
        setDisplayedContent(getDisplayedContent())
    }, [items])

    useEffect(() => {
        setDisplayedContent(getDisplayedContent())
    }, [tab])

    const handlePageChange = (currentPage, from, to) => {
        setDisplayedContent(items[tab].movies.slice(from, to + 1))
    }

    const renderTabs = () => {
        return Object.entries(items).map(([k, i]) => <span key={k} className={k === tab ? 'activeTab' : ''} onClick={() => setTab(k)}>{i.tab}</span>)
    }

    const renderList = () => {
        if (displayedContent.length > 0) {
            return displayedContent.map((m, i) => {
                return (
                    <div key={`${tab}:${m.id}`} className={`movielist__item ${i % 2 === 0 ? 'even' : 'odd'}`}>
                        <Link to={`/movie/${m.id}`}><p>{m.name}</p></Link>
                        <div className="movielist__actions">
                            {items[tab].actions.map((action, index) => <span key={`${tab}:${m.id}:${index}`}>{action(m)}</span>)}
                        </div>
                    </div>
                )
            })
        }
        else
            return <div className="movielist__empty">You don't have any movies added to your {items[tab].tab.toLowerCase()} list</div>
    }

    return (
        <div className="movielist">
            <div className="movielist__header">
                <div className="movielist__tabs">
                    {renderTabs()}
                </div>
                <div className="movielist__pagination">
                    <Pagination key={tab} pageLimit={pageLimit} totalRecords={items[tab].movies.length} onPageChanged={handlePageChange} />
                </div>
            </div>
            <div className="movielist__items">
                {renderList()}
            </div>
        </div>
    )
}

export default MovieList
