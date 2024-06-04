import React, { useEffect, useState } from 'react';
import '../styles/components/Expandable.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Expandable = ({
    children,
    label,
    expanded,
    padding,
    marginH,
    marginV,
    contentPadding,
    backgroundColor
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setIsExpanded(expanded || false);
    }, [expanded]);

    const style = {
        margin: `${marginH} ${marginV}` || '150px 0px',
        backgroundColor: backgroundColor || 'rgba(34, 34, 34, 0.354)',
        padding: padding || '15px',
    }

    return (
        <div style={style} className="expandable-component" onClick={() => { setIsExpanded(!isExpanded); }}>
            <span className="label-link expandable-label">
                {label} &nbsp; {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
            {isExpanded && <div style={{padding: contentPadding || '20px'}} className="content" onClick={(e) => { e.stopPropagation() }}>{children}</div>}
        </div>
    );
};

export default Expandable;