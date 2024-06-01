import "../styles/components/APIList.css";
import { useNavigate } from "react-router-dom";

const APIList = ({ apis }) => {
    const navigate = useNavigate();
    return (
        <div className="apis-container">
            <ul className="apis-list">
                {apis && (apis.length === 0 ? (
                    <div className="no-apis">
                        <p>No APIs found...</p>
                    </div>
                ) :

                    apis.map(api => (
                        <li onClick={() => { navigate("/api/" + api.alias) }} key={api.api_id} className="api-item">
                            <img
                                src={api.image_url}
                                alt={api.api_title}
                                className='api-image'
                                loading="lazy"
                            />

                            <div className="api-info">
                                <div className="api-info-title">
                                    <div className="api-name">
                                        {api.api_title}
                                    </div>
                                    <div className="api-id">
                                        {api.alias}
                                    </div>
                                </div>
                                <div className="api-divider"></div>


                                <p className="api-description">
                                    {api.description}
                                </p>
                            </div>
                        </li>
                    )))}
            </ul>
        </div>
    );

}

export default APIList;