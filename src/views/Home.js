import '../styles/views/Home.css'
import APIList from "../components/APIList";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuthState';
import HeroLogo from '../components/HeroLogo';
import Banner from '../components/Banner';

const Home = () => {
    const [apis, setAPIs] = useState([])
    const [angle, setAngle] = useState(0);
    const [opacity, setOpacity] = useState(0.6);
    const [isPending, setIsPending] = useState(true)
    const axiosPrivate = useAxiosPrivate();
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

            if (distance < 150) {
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

    const getData = async () => {
        try {
            setIsPending(true);
            const response = await axiosPrivate("/apis?limit=8&offset=0");
            setAPIs(response.data?.apis);
            setIsPending(false);
        } catch (error) {
            setIsPending(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getData();
    }, []);

    return (
        <div className="home">
            <Banner color="#3c23b8"/>
            <div className='hero-container'>
                <div className="home-banner">
                    <div className="home-title-container">
                        <h1 className='home-title' >
                            Empower Your Apps with AI
                        </h1>
                        <div id='logo-wrapper' style={{ transform: `rotate(${angle}deg)`, opacity: opacity, transition: '1s' }}>
                            <HeroLogo />
                        </div>

                    </div>

                    <ul className='home-list'>
                        <li className='home-list-item home-list-item-2'>
                            <h2 className='home-list-item-title'>
                                Pay As You Go
                            </h2>
                            <p className='home-list-description'>With our API services, you'll enjoy the flexibility of paying based on your actual usage. No upfront costs or hidden fees.</p>
                        </li>
                        <li className='home-list-item'>
                            <h2 className='home-list-item-title'>
                                Wide Range of APIs
                            </h2>
                            <p className='home-list-description'>Explore a diverse set of apis tailored to your needs. Our API offers a comprehensive range of AI apis to choose from.</p>
                        </li>
                        <li className='home-list-item'>
                            <h2 className='home-list-item-title'>
                                No Setup Required
                            </h2>
                            <p className='home-list-description'>Our API services are designed for effortless integration, allowing you to get started without any hassle.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="latest-apis-header">
                <Link to={"apis"} className='label-link'>
                    See All APIs
                    <MdKeyboardArrowRight size={20} className='all-apis-icon' />
                </Link>
            </div>
            {isPending ?
                <Loading />
                :
                <APIList apis={apis} />
            }
        </div>
    );
}

export default Home;