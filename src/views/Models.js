import '../styles/views/Models.css';
import ModelList from '../components/ModelList';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { AiOutlineSearch } from 'react-icons/ai';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

const Models = () => {
    const [models, setModels] = useState([])
    const [isPending, setIsPending] = useState(true)
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [offset, setOffset] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const categories = [
        // "LLM", "Stable Diffusion", "Image Generation", "Audio Generation", "Video Generation", "Inpainting", "Controlnet", "Super Resolution", "Face Enhancing", "Text to Image", "Image to Image", "Image to Text"
    ]
    const [searchQuery, setSearchQuery] = useState("")


    const getModels = async () => {
        const response = await axiosPrivate(`/models?limit=8&offset=${offset}`);
        const newModels = response?.data?.models;

        if (newModels.length < 8) {
            setIsEnd(true);
            if (newModels.length === 0) {
                setIsPending(false);
                return
            }
        }
        setModels(models.concat(newModels));
        setOffset(response?.data?.lastOffset);
    };


    useEffect(() => {
        setIsPending(true);
        getModels();
        setIsPending(false);
    }, []);

    const search = async (e) => {
        e.preventDefault();
        try {
            setIsPending(true);
            if (searchQuery === "") {
                return
            }
            const response = await axiosPrivate(`/models/query-alias?alias=${searchQuery}`);
            setModels(response?.data?.models);
            setIsPending(false);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login", { state: { from: location }, replace: true });
            }
            setIsPending(false);
        }
        setSearchQuery("");
    }

    return (
        <div className='models-main'>
            <div>
                <div className="all-models-header">

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
                        <input type="text" placeholder="model id..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                        <button type="submit" className="search-button">
                            <AiOutlineSearch size={25} style={{ paddingTop: '5px', fill: 'cadetblue' }} />
                        </button>
                    </form>
                </div>
                <div className="content-container">
                    {isPending ?
                        <Loading />
                        :
                        <ModelList models={models} />
                    }
                    {!isEnd &&
                        (<button className="load-more-button" onClick={getModels}>
                            Load More...
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Models;
