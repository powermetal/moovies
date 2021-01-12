import React, { useRef } from 'react';
import './DropDownMenu.css';
import { Link } from 'react-router-dom';

const DropDownMenu = ({ items, active, blur }, menuRef) => {

    const renderMenu = () => {
        return items.map((item, index) => <Link key={index} tabIndex={0} ref={menuRef} onBlur={blur} onClick={item.action} className="menu__item" to={`${item.path ? item.path : '#'}`} >{item.icon}<span>{item.value}</span></Link>)
    }

    const isActive = () => {
        if (active)
            return '__active'
        else
            return ''
    }

    return (
        <div className={`menu${isActive()}`} >
            {renderMenu()}
        </div>
    )
}

export default React.forwardRef(DropDownMenu)
