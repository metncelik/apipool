import { useEffect, useState } from 'react';
import '../styles/components/PopupModule.css';
import { MdClose } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

const PopupModule = ({
    message = "message",
    buttonLabel = "button",
    actionCallback,
    actionType = "info",
    buttonColor = "",
    isVisibleState
 }) => {
    const [isVisible, setIsVisible] = isVisibleState; 
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        setIsVisible(true);

        switch (actionType) {
            case "info":
                setIcon(<BsInfoCircle size={40} color='#3498db' />);
                break;
            case "warning":
                setIcon(<IoIosWarning size={40} color='#FFD700' />);
                break;
            case "error":
                setIcon(<MdErrorOutline size={40} color='#FF0000' />);
                break;
        }
    }, []);

    const handleClick = () => {
        setIsVisible(false);
        actionCallback();
    };

    return (
        <>
            {isVisible &&
                (<div className="popup-module">
                    <div onClick={() => { return }} className="popup-window">
                        <button
                            onClick={() => { setIsVisible(false) }}
                            className='close-button'>
                            <MdClose size={25} />
                        </button>
                        <div className="popup-message-container">
                            {icon}
                            <div className="popup-message">
                                {message}
                            </div>
                            <button onClick={handleClick}
                                className=''
                                style={{ backgroundColor: `${buttonColor}` }}>
                                {buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
}

export default PopupModule;