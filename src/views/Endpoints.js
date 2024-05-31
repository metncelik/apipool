import '../styles/views/Endpoints.css';
import EndpointList from '../components/EndpointList';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { AiOutlineSearch } from 'react-icons/ai';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Banner from '../components/Banner';

const Endpoints = () => {
    const [endpoints, setEndpoints] = useState([])
    const [isPending, setIsPending] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const [offset, setOffset] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const categories = [
        // "LLM", "Stable Diffusion", "Image Generation", "Audio Generation", "Video Generation", "Inpainting", "Controlnet", "Super Resolution", "Face Enhancing", "Text to Image", "Image to Image", "Image to Text"
    ]
    const [searchQuery, setSearchQuery] = useState("")


    const getEndpoints = async () => {
        const limit = 8;
        setIsPending(true);
        const response = await axiosPrivate(`/endpoints?limit=${limit}&offset=${offset}`);
        setIsPending(false);
        if (!response) return;
        const newEndpoints = response.data?.endpoints;

        if (newEndpoints.length < limit) {
            setIsEnd(true);
            if (newEndpoints.length === 0) return;
        }
        setEndpoints(endpoints.concat(newEndpoints));
        setOffset(response.data.lastOffset);
    };


    useEffect(() => {
        getEndpoints();
    }, []);

    const search = async (e) => {
        e.preventDefault();
        setIsPending(true);
        if (searchQuery === "") return;
        const response = await axiosPrivate(`/endpoints/query-alias?alias=${searchQuery}`);
        setIsPending(false);
        if (!response) return;
        setEndpoints(response.data?.endpoints);
        setSearchQuery("");
    }

    return (
        <div className='endpoints-main'>
            <Banner color="#3c23b8"/>
            <div>
                <div className="all-endpoints-header">

                    <div className="categories">
                        {/* {categories.map((category, index) => (
                            <button onClick={() => { (selectCategory(category)) }} className={`category ${selectedCategories.length !== categories.length && selectedCategories.includes(category) ? "selected-category" : ""}`} key={index}>
                                {selectedCategories.length !== categories.length && selectedCategories.includes(category) ?
                                    <IoMdCloseCircle size={15} className="category-close" />
                                    : null}
                                {category}
                            </button>
                        ))} */}
                    </div>

                    <form className="search-container" onSubmit={search}>
                        <input type="text" placeholder="endpoint id..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                        <button type="submit" className="search-button">
                            <AiOutlineSearch size={25} style={{ paddingTop: '5px', fill: 'cadetblue' }} />
                        </button>
                    </form>
                </div>
                <div className="content-container">
                    {isPending ?
                        <Loading />
                        :
                        <EndpointList endpoints={endpoints} />
                    }
                    {!isEnd &&
                        (<button className="load-more-button" onClick={getEndpoints}>
                            Load More...
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Endpoints;
