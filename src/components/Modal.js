import { useEffect, useState } from 'react';
import '../styles/components/Modal.css';
import { MdClose } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import useModal from '../hooks/useModal';
import Loading from './Loading';

const Modal = ({
    message = "message",
    buttonLabel = "button",
    actionCallback,
    actionType = "info",
    buttonColor = ""
 }) => {
    const { isModalOpen, setIsModalOpen } = useModal();
    const [icon, setIcon] = useState(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsModalOpen(true);

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

    const handleClick = async () => {
        setIsPending(true);
        await actionCallback();
        setIsModalOpen(false);
        setIsPending(false);
    };

    return (
        <>
            {isModalOpen &&
                (<div className="popup-module">
                    {isPending ? <Loading/> :<div onClick={() => { return }} className="popup-window">
                        <button
                            onClick={() => { setIsModalOpen(false) }}
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
                    </div>}
                </div>)
            }
        </>
    );
}

export default Modal;