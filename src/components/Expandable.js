import React, { useEffect, useState } from 'react';
import '../styles/components/Expandable.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Expandable = ({ children, label, expanded }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setIsExpanded(expanded || false);
    }, [expanded]);

    return (
        <div className="expandable-component" onClick={()=>{setIsExpanded(!isExpanded);}}>
            <span className="label-link expandable-label">
                {label} &nbsp; {isExpanded ? <IoIosArrowUp/> : <IoIosArrowDown/>}
            </span>
            {isExpanded && <div className="content" onClick={(e)=>{e.stopPropagation()}}>{children}</div>}
        </div>
    );
};

export default Expandable;