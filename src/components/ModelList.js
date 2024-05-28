import "../styles/components/ModelList.css";
import { useNavigate } from "react-router-dom";

const ModelList = ({ models }) => {
    const navigate = useNavigate();
    return (
        <div className="models-container">
            <ul className="models-list">
                {models && (models.length === 0 ? (
                    <div className="no-models">
                        <p>No Models found...</p>
                    </div>
                ) :

                    models.map(model => (
                        <li onClick={() => { navigate("/model/" + model.alias) }} key={model.model_id} className="model-item">
                            <img
                                src={model.image_url}
                                alt={model.model_title}
                                className='model-image'
                                loading="lazy"
                            />

                            <div className="model-info">
                                <div className="model-title">
                                    <div className="model-name">
                                        {model.model_title}
                                    </div>
                                    <div className="model-id">
                                        {model.alias}
                                    </div>
                                </div>

                                <div className="model-divider"></div>

                                <p className="model-description">
                                    {model.description}
                                </p>
                            </div>
                        </li>
                    )))}
            </ul>
        </div>
    );

}

export default ModelList;