import "../styles/components/EndpointList.css";
import { useNavigate } from "react-router-dom";

const EndpointList = ({ endpoints }) => {
    const navigate = useNavigate();
    return (
        <div className="endpoints-container">
            <ul className="endpoints-list">
                {endpoints && (endpoints.length === 0 ? (
                    <div className="no-endpoints">
                        <p>No Endpoints found...</p>
                    </div>
                ) :

                    endpoints.map(endpoint => (
                        <li onClick={() => { navigate("/endpoint/" + endpoint.alias) }} key={endpoint.endpoint_id} className="endpoint-item">
                            <img
                                src={endpoint.image_url}
                                alt={endpoint.endpoint_title}
                                className='endpoint-image'
                                loading="lazy"
                            />

                            <div className="endpoint-info">
                                <div className="endpoint-title">
                                    <div className="endpoint-name">
                                        {endpoint.endpoint_title}
                                    </div>
                                    <div className="endpoint-id">
                                        {endpoint.alias}
                                    </div>
                                </div>
                                <div className="endpoint-divider"></div>


                                <p className="endpoint-description">
                                    {endpoint.description}
                                </p>
                            </div>
                        </li>
                    )))}
            </ul>
        </div>
    );

}

export default EndpointList;