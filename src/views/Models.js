import '../styles/screens/Models.css'
import ModelList from '../components/ModelList'
import Banner from '../components/Banner'
import { useEffect, useState } from 'react'
import { GetModelPreviews } from '../database/db'
import Loading from '../components/Loading'
import { IoMdCloseCircle } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai'

const Models = () => {
    const [models, setModels] = useState()
    const getModelPreviews = new GetModelPreviews()
    const [isPending, setIsPending] = useState(true)
    const categories = ["LLM", "Stable Diffusion", "Image Generation", "Audio Generation", "Video Generation", "Inpainting", "Controlnet", "Super Resolution", "Face Enhancing", "Text to Image", "Image to Image", "Image to Text"]
    const [selectedCategories, setSelectedCategories] = useState(categories)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        setIsPending(true)
        getModelPreviews.withCategory(selectedCategories).then(
            res => {
                setModels(res)
                setIsPending(false)
            }
        )
    }, [selectedCategories])

    const selectCategory = (category) => {
        if (selectedCategories.length === categories.length) {
            setSelectedCategories([category])
        } else {
            if (selectedCategories[0] === category) {
                setSelectedCategories(categories)
            } else {
                setSelectedCategories([category])
            }

        }
    }

    const search = (e) => {
        e.preventDefault();
        if (searchQuery === "") {
            return
        }
        setIsPending(true)
        getModelPreviews.withQuery(searchQuery).then(
            res => {
                setModels(res)
                setIsPending(false)
            }
        )
        setSearchQuery("")
    }

    return (
        <div className='all-models'>
            <div className="container">
                <div className="search-banner">

                    <div className="categories">
                        {categories.map((category, index) => (
                            <button onClick={() => { (selectCategory(category)) }} className={`category ${selectedCategories.length !== categories.length && selectedCategories.includes(category) ? "selected-category" : ""}`} key={index}>
                                {selectedCategories.length !== categories.length && selectedCategories.includes(category) ?
                                    <IoMdCloseCircle size={15} className="category-close" />
                                    : null}
                                {category}
                            </button>
                        ))}
                    </div>

                    <form className="search-container" onSubmit={search}>
                        <input type="text" placeholder="model id..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                        <button type="submit" className="search-button">
                            <AiOutlineSearch size={25} style={{ paddingTop: '5px', fill: 'cadetblue' }} />
                        </button>
                    </form>
                </div>
                {isPending ?
                    <Loading />
                    :
                    <ModelList models={models} />
                }
            </div>
        </div>
    );
}

export default Models;
