import "../styles/components/ModelList.css";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GetModels } from "../database/db";

const ModelList = ({ models }) => {
    const navigate = useNavigate();
    return (
            <ul className="models-list">
                {models.map(model => (
                    <li onClick={()=>{navigate("/model/"+model.id)}} key={model.id} className="model-item">
                        <img
                            src={model.image_url}
                            alt={model.name}
                            className='model-image'
                            loading="lazy" />

                        <div className="model-info">
                            <div className="model-title">
                                <div className="model-name">
                                    {model.name}
                                </div>
                                <div className="model-id">
                                    {model.id}
                                </div>
                            </div>

                            <div className="model-divider"></div>

                            <p className="model-description">
                                {model.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
    );

}

export default ModelList;