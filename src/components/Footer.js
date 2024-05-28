import '../styles/components/Footer.css'
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="social-icons">
                        <FaGithub size={"20px"} className='social-icon' />
                        <FaXTwitter size={"20px"} className='social-icon' />
                        <FaInstagram size={"20px"} className='social-icon' />
                </div>
                <p className="footer-text">
                    © API POOL 2024. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;