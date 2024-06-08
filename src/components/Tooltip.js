import { useState } from 'react';
import '../styles/components/Tooltip.css';

const Tooltip = ({ children, text }) => {
    const [show, setShow] = useState(false);

    const showTooltip = () => {
        setShow(true);
    }

    const hideTooltip = () => {
        setShow(false);
    }

    return (
        <div className="tooltip" onMouseOver={showTooltip} onMouseOut={hideTooltip}>
            {children}
            <span
                style={{
                    visibility: show ? 'visible' : 'hidden',
                    opacity: show ? 1 : 0
                }}
                className='tooltiptext'>
                {text}
            </span>

        </div>
    );
}


export default Tooltip;