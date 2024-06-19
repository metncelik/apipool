import '../styles/components/Footer.css'
import { IoLogoReddit } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="social-icons">
                    <a href='https://github.com/api-pool'>
                        <FaGithub size={"20px"} className='social-icon' />
                    </a>
                    <a href='https://x.com/apipool_ai'>
                        <FaXTwitter size={"20px"} className='social-icon' />
                    </a>
                    <a href='https://www.youtube.com/@apipool_ai'>
                        <AiOutlineYoutube size={"20px"} className='social-icon' />
                    </a>
                    <a href='https://www.reddit.com/r/apipool/'>
                        <IoLogoReddit size={"20px"} className='social-icon' />
                    </a>
                    <a href='https://instagram.com/apipool_ai'>
                        <FaInstagram size={"20px"} className='social-icon' />
                    </a>
                </div>
                <div className="footer-links">
                    <Link to={'/privacy-policy'} className='footer-link'>Privacy Policy</Link>
                    <Link to={'/terms-of-service'} className='footer-link'>Terms of Service</Link>
                    <Link to={'/refund-policy'} className='footer-link'>Refund Policy</Link>
                </div>
                <div className='copy-right'>
                    © API POOL 2024. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;