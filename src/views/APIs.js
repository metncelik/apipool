import '../styles/views/APIs.css';
import APIList from '../components/APIList';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { AiOutlineSearch } from 'react-icons/ai';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Banner from '../components/Banner';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

const APIs = () => {
    const [apis, setAPIs] = useState(null)
    const axiosPrivate = useAxiosPrivate();
    const [offset, setOffset] = useState(1000);
    const [isEnd, setIsEnd] = useState(false);
    const categories = [
        // "LLM", "Stable Diffusion", "Image Generation", "Audio Generation", "Video Generation", "Inpainting", "Controlnet", "Super Resolution", "Face Enhancing", "Text to Image", "Image to Image", "Image to Text"
    ]
    const [searchQuery, setSearchQuery] = useState("")
    const [_, setSearchParams] = useSearchParams("")


    const getAPIs = async () => {
        const limit = 8;
        const response = await axiosPrivate(`/apis?limit=${limit}&offset=${offset}`);
        if (!response) return;
        const newAPIs = response.data?.apis || [];

        if (newAPIs.length < limit) {
            setIsEnd(true);
            if (newAPIs.length === 0) return;
        }
        setAPIs(apis?.concat(newAPIs) || newAPIs);
        setOffset(response.data.lastOffset);
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        getAPIs();
    }, []);

    const search = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        setAPIs(null);
        const response = await axiosPrivate(`/apis/query?alias=${searchQuery}`);
        if (!response) return;
        setSearchParams({ "q": searchQuery });
        setAPIs(response.data?.apis);
        setSearchQuery("");
    }

    return (
        <div className='apis-main'>
            <Banner margin={50} color="darkblue" />
            <SEO title = {"ALL APIs"}/>
            <div>
                <div className="all-apis-header">

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
                        <input type="text" className="search-input" placeholder="Search..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                        <button type="submit" className="search-button">
                            <AiOutlineSearch size={25} style={{fill: 'cadetblue' }} />
                        </button>
                    </form>
                </div>
                <div className="content-container">
                    <APIList apis={apis} />
                    {!isEnd &&
                        (<button className="load-more-button" onClick={getAPIs}>
                            Load More...
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
}

export default APIs;
