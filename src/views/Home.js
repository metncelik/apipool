import '../styles/screens/Home.css'
import ModelList from "../components/ModelList";
import Banner from "../components/Banner";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GetModelPreviews } from '../database/db';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const Home = () => {
    const [models, setModels] = useState([])
    const getModelPreviews = new GetModelPreviews()
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        getModelPreviews.withRange([0, 8]).then(
            res => {
                setModels(res)
                setIsPending(false)
            }
        )
    }, [])

    return (
        <div className="home">
            <div className='home-banner'>
                    <h2 className='home-title'>
                        Power Up your apps with Serverless AI endpoints.
                    </h2>
                    <ul className='home-list'>
                        <li className='home-list-item'>
                            <h3 className='home-list-item-title'>
                                Pay Only for What You Use
                            </h3>
                            <p>With our API services, you'll enjoy the flexibility of paying based on your actual usage. No upfront costs or hidden fees.</p>
                        </li>
                        <li className='home-list-item'>
                            <h3 className='home-list-item-title'>
                                Wide Range of Endpoints
                            </h3>
                            <p>Explore a diverse set of endpoints tailored to your needs. Our API offers a comprehensive range of functionalities to choose from.</p>
                        </li>
                        <li className='home-list-item'>
                            <h3 className='home-list-item-title'>
                                No Setup Required
                            </h3>
                            <p>Say goodbye to complex setups. Our API services are designed for effortless integration, allowing you to get started without any hassle.</p>
                        </li>
                    </ul>
            </div>
            <div className="latest-models-container container">
                <Link to={"models"} className='all-models-button'>
                    All Models
                    <MdKeyboardArrowRight size={20} className='all-models-icon' />
                </Link>
            </div>
            {isPending ?
                <Loading />
                :
                <ModelList models={models} />
            }
        </div>
    );
}

export default Home;