import '../styles/views/Home.css'
import EndpointList from "../components/EndpointList";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuthState';
import HeroLogo from '../components/HeroLogo';

const Home = () => {
    const [endpoints, setEndpoints] = useState([])
    const [angle, setAngle] = useState(0);
    const [opacity, setOpacity] = useState(0.6);
    const [isPending, setIsPending] = useState(true)
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const requestRef = useRef();

    const animate = useCallback((time) => {
        setAngle(prevAngle => prevAngle + 0.5); 
        requestRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const element = document.getElementById('logo-wrapper');
            const rect = element.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;

            const deltaX = event.clientX - elementCenterX;
            const deltaY = event.clientY - elementCenterY;

            if (deltaX === 0 && deltaY === 0) return;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance <150) {
                cancelAnimationFrame(requestRef.current);
            };

            const maxDistance = 550; 
            const newOpacity = Math.max(0.4, Math.min(1, 1 - distance / maxDistance));
            setOpacity(newOpacity);

        };

        
        requestRef.current = requestAnimationFrame(animate);
        
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, [animate]);


    useEffect(() => {
        const getData = async () => {
            try {
                setIsPending(true);
                const response = await axiosPrivate("/endpoints?limit=8&offset=0");
                setEndpoints(response.data?.endpoints);
                setIsPending(false);
            } catch (error) {
                setIsPending(false);
            }
        };
        getData();
    }, []);

    return (
        <div className="home">
            <div className='hero-container'>
                <div className="home-banner">
                    <div className="home-title-container">

                        <h2 className='home-title' >
                        Empower Your Apps with AI
                        </h2>
                        <div id='logo-wrapper' style={{ transform: `rotate(${angle}deg)`, opacity: opacity, transition: '1s' }}>
                            <HeroLogo />
                        </div>

                    </div>

                    <ul className='home-list'>
                        <li className='home-list-item home-list-item-2'>
                            <h3 className='home-list-item-title'>
                                Pay As You Go
                            </h3>
                            <p className='home-list-description'>With our API services, you'll enjoy the flexibility of paying based on your actual usage. No upfront costs or hidden fees.</p>
                        </li>
                        <li className='home-list-item'>
                            <h3 className='home-list-item-title'>
                                Wide Range of APIs
                            </h3>
                            <p className='home-list-description'>Explore a diverse set of endpoints tailored to your needs. Our API offers a comprehensive range of AI endpoints to choose from.</p>
                        </li>
                        <li className='home-list-item'>
                            <h3 className='home-list-item-title'>
                                No Setup Required
                            </h3>
                            <p className='home-list-description'>Our API services are designed for effortless integration, allowing you to get started without any hassle.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="latest-endpoints-header">
                <Link to={"endpoints"} className='label-link'>
                    See All Endpoints
                    <MdKeyboardArrowRight size={20} className='all-endpoints-icon' />
                </Link>
            </div>
            {isPending ?
                <Loading />
                :
                <EndpointList endpoints={endpoints} />
            }
        </div>
    );
}

export default Home;