import '../../styles/tabs/console/AddAPI.css'
import ToggleButton from '../../components/ToggleButton';
import { useState } from 'react';
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";


const AddAPI = () => {
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleFileChanger = (e) => {
        e.preventDefault();

        const fileInput = e.target;

        if (fileInput.files.length > 0) {
            const selectedFile = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function () {
                const base64String = reader.result;

                console.log('Base64 String:', base64String);
            };

            reader.readAsDataURL(selectedFile);
        } else {
        }
    }

    return (
        <div className="add-api container">
            <form className='add-api-form' onSubmit={handleSubmit}>

                <div className="form-element">
                    <input className='console-input' type="text" id="name" name="name" placeholder="Name *" />
                </div>
                <div className="form-element">
                    <input className='console-input' type="text" id="alias" name="alias" placeholder="Alias *" />
                </div>
                <div className="form-element">
                    <textarea className='console-input console-text-area' id="description" name="description" placeholder="Description *"></textarea>
                </div>
                <div className="form-element">
                    <input className='console-input' type="file" id="photo" name="photo" onChange={handleFileChanger} placeholder="Photo *" />
                </div>
                <div className="form-element">
                    <select className='console-select' id="category" placeholder="Category *">
                        <option value="" hidden>Select Category</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                <div className="form-element">
                    <ToggleButton
                        text="Public API: "
                        defaultState={isPublic}
                        stateSetter={setIsPublic}
                        icons={[<BsFillUnlockFill size={10} />, <BsFillLockFill size={10} />]}
                    />

                </div>

                <h3>ENDPOINTS</h3>

                <div className="apis-row">
                    <div className="api-chip">
                        end
                    </div>
                    <div className="api-chip">
                        end2
                    </div>
                </div>
                <div className="form-element">
                    <input className='console-input' type="text" id="urlPath" name="urlPath" placeholder="URL Path *" />
                </div>
                <div className="form-element">
                    <textarea className='console-input console-text-area' id="description" name="description" placeholder="Description *" ></textarea>
                </div>
                <div className="form-element">
                    <select className='console-select' id="httpMethod" placeholder="HTTP Method *">
                        <option value="" hidden>Select HTTP Method</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                <h3>inputs</h3>
                <span>name denem sınav kuku papa cucu susu ana</span>
                <div className="form-element">
                    <input className='console-input' type="text" id="name" name="name" placeholder="Input Param Name *" />
                </div>
                <div className="form-element">
                    <input className='console-input' type="text" id="name" name="name" placeholder="Value Type *" />
                </div>
                <div className="form-element">
                    <input className='console-input' type="text" id="input-default-value" name="input-default-value" placeholder="Default Value *" />
                </div>
                <div className="form-element">
                    <textarea className='console-input console-text-area' id="description" name="description" placeholder="Description *" ></textarea>
                </div>
                <div className="form-element">
                    <ToggleButton
                        text="Required: "
                        defaultState={isPublic}
                        stateSetter={setIsPublic}
                        icons={[<FaCheck size={10} />, <MdOutlineClose size={10} />]}
                    />
                </div>
                <div className="form-element">
                    <button>Add Input</button>
                </div>
                <h3>outputs</h3>
                <span>name denem sınav kuku papa cucu susu ana</span>
                <div className="form-element">
                    <input className='console-input' type="text" id="name" name="name" placeholder="Output Param Name *" />
                </div>
                <div className="form-element">
                    <input className='console-input' type="text" id="name" name="name" placeholder="Value Type *" />
                </div>
                <div className="form-element">
                    <textarea className='console-input console-text-area' id="description" name="description" placeholder="Description *" ></textarea>
                </div>

                <div className="form-element">
                    <button>Add Output</button>
                </div>
                <div className="form-element">
                    <button>Add API</button>
                </div>
                <div className="form-element">
                    <button type="submit">Submit API</button>
                </div>
            </form>
        </div>
    );
};

export default AddAPI;