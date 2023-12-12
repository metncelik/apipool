import { useEffect, useState } from 'react';
import '../styles/components/PopupModule.css';
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from "react-icons/bs";

const PopupModule = ({message = "message",buttonLabel = "button", path = "", navigate = true}) => {
    const [isVİsible, setIsVisible] = useState()
    const navigator = useNavigate()
    const clickHandler = () => {
        if (navigate) {
            navigator(path)
        } else {
            setIsVisible(false)
        }
    }
    useEffect(()=> {
        setIsVisible(true)
    }, [])
    return (
        <div>
            {isVİsible &&
                (<div className="popup-module">
                    <div onClick={() => {return}} className="popup-window">
                        <button onClick={() => {setIsVisible(false) }} className='close-button'>
                            <MdClose size={25} />
                        </button>
                        <div className="popup-message-container">
                           <BsInfoCircle size={30}/>
                            <div className="popup-message">
                            {message}
                            </div>
                            <button onClick={()=>{clickHandler()}} className='dashboard-button'>
                                {buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
}

export default PopupModule;