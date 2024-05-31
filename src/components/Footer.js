import '../styles/components/Footer.css'
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="social-icons">
                    <FaGithub size={"20px"} className='social-icon' />
                    <FaXTwitter size={"20px"} className='social-icon' />
                    <FaInstagram size={"20px"} className='social-icon' />
                </div>
                <div className="footer-links">
                    <Link to={'/privacy-policy'} className='footer-link'>Privacy Policy</Link>
                    <Link to={'/terms-of-service'} className='footer-link'>Terms of Service</Link>
                </div>
                © API POOL 2024. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;