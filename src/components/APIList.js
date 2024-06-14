import "../styles/components/APIList.css";
import { Link, useNavigate } from "react-router-dom";
import { APIListSkeleton } from "./sekeleton/APIListSkeleton";

const APIList = ({ apis }) => {
    
    if (!apis) return <APIListSkeleton/>;
    apis = [...apis,...apis, ...apis, ...apis, ...apis, ...apis, ...apis, ...apis ]
    return (
        <div className="apis-container">
            <ul className="apis-list">
                {apis && (apis.length === 0 ? (
                    <div className="no-apis">
                        <p>No APIs found...</p>
                    </div>
                ) :

                    apis.map(api => (
                        <li key={api.api_id} className="api-item">
                            <Link to={"/api/" + api.alias}>
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
                                </div>
                                <div className="api-divider"></div>


                                <p className="api-description">
                                    {api.description.slice(0, 110) + (api.description.length > 100 ? "..." : "")}
                                </p>
                            </div>
                            </Link>
                        </li>
                    )))}
            </ul>
        </div>
    );

}

export default APIList;