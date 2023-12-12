import "../../styles/components/admin/AddModel.css";
import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { addModel } from "../../database/db";
import { uploadFile } from "../../database/storage";

const AddModel = () => {


    const [modelID, setModelId] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [downloadURL, setDownloadUrl] = useState(null)
    const [method, setMethod] = useState("")
    const [endpoint, setEndpoint] = useState("")
    const [fetch, setFetch] = useState(false)
    const [fetchUrl, setFetchUrl] = useState("")
    const [fetchMethod, setFetchMethod] = useState("")
    const [inputParams, setInputParams] = useState([])
    const [outputParams, setOutputParams] = useState([])
    const [category, setCategory] = useState([])
    const [categories, setCategories] = useState([])

    const [inputParamName, setInputParamName] = useState("")
    const [inputParamType, setInputParamType] = useState("")
    const [inputParamDefault, setInputParamDefault] = useState("-")
    const [inputParamDescription, setInputParamDescription] = useState(name)
    const [inputParamRequired, setInputParamRequired] = useState(false)

    const [outputParamName, setOutputParamName] = useState("")
    const [outputParamType, setOutputParamType] = useState("")

    const [uploadedFile, setUploadedFile] = useState(null);
    const fileDataAsBytes = [];

    const onDrop = useCallback((acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    const handleUpload = () => {
        try {
            if (uploadedFile) {
                const fileExtension = uploadedFile.name.split(".")[1]
                const reader = new FileReader();
                reader.onload = async () => {
                    const bytes = new Uint8Array(reader.result);
                    fileDataAsBytes.push(bytes);
                    const downloadURL = await uploadFile(`model_images/${modelID}.${fileExtension}`, bytes)
                    alert(downloadURL)
                    setDownloadUrl(downloadURL)
                };
                reader.readAsArrayBuffer(uploadedFile);

            };
        } catch (error) {
            alert(error)
        }
    }



    const addInputParam = (e) => {
        e.preventDefault()
        const newParam = {
            name: inputParamName,
            type: inputParamType,
            default: inputParamDefault,
            description: inputParamDescription,
            required: inputParamRequired ? "true" : "false"
        }
        setInputParams([...inputParams, newParam])
    }

    const addOutputParam = (e) => {
        e.preventDefault()
        const newParam = {
            name: outputParamName,
            type: outputParamType
        }
        setOutputParams([...outputParams, newParam])
    }

    const addCategory = (e) => {
        e.preventDefault(); 
        setCategories([...categories, category]);
        setCategory("")
    }

    const handleAddModel = async (e) => {
        e.preventDefault()
        const modelPreviewData = {
            id: modelID,
            name: name,
            description: description,
            image_url: downloadURL
        }
        const modelData = {
            id: modelID,
            name: name,
            description: description,
            image_url: downloadURL,
            method: method,
            endpoint: endpoint,
            fetch: fetch,
            fetch_url: fetchUrl,
            fetch_method: fetchMethod,
            input_params: inputParams,
            output_params: outputParams
        }
        await addModel(modelPreviewData, modelData, modelID)
    }
    
    return (
        <div className="add-model container">
            <h2>Add Model</h2>
            <form onSubmit={handleAddModel}>
                <div className="input-group">
                    <input type="text" placeholder="model id" value={modelID} onChange={(e) => { setModelId(e.target.value) }} />
                    <input type="text" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input type="text" placeholder="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <input type="text" placeholder="method" value={method} onChange={(e) => { setMethod(e.target.value) }} />
                    <input type="text" placeholder="endpoint" value={endpoint} onChange={(e) => { setEndpoint(e.target.value) }} />
                    <div className="check-box-container">
                        <label htmlFor="html">fetch</label>
                        <input className="check-box" type="checkbox" checked={fetch} onChange={() => { setFetch(!fetch) }} />
                    </div>
                    <input type="text" placeholder="fetch url" value={fetchUrl} onChange={(e) => { setFetchUrl(e.target.value) }} />
                    <input type="text" placeholder="fetch method" value={fetchMethod} onChange={(e) => { setFetchMethod(e.target.value) }} />
                </div>
                <button type="submit" className="dashboard-button">Add Model</button>
            </form>
            <form onClick={addCategory}>
                <div className="input-group">
                    <input type="text" placeholder="category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                </div>
                <button type="submit">Add Model</button>
            </form>
            {categories.map(category =>
                <div className="params-preview-container">
                    <p>{category}</p>
                </div>
            )}
            <form onSubmit={addInputParam}>
                <div className="input-group">
                    <br /><label htmlFor="html">add input param</label>
                    <div className="check-box-container">
                        <label htmlFor="html">required</label>
                        <input className="check-box" type="checkbox" checked={inputParamRequired} onChange={() => { setInputParamRequired(!inputParamRequired) }} />
                    </div>
                    <input type="text" placeholder="param name" value={inputParamName} onChange={(e) => { setInputParamName(e.target.value) }} />
                    <input type="text" placeholder="param type" value={inputParamType} onChange={(e) => { setInputParamType(e.target.value) }} />
                    <input type="text" placeholder="param default" value={inputParamDefault} onChange={(e) => { setInputParamDefault(e.target.value) }} />
                    <input type="text" placeholder="param description" value={inputParamDescription} onChange={(e) => { setInputParamDescription(e.target.value) }} />
                    <br />
                    <button type="submit" className="dashboard-button">Add Input Param</button>
                </div>
            </form>
            {inputParams.map(param =>
                <div className="params-preview-container">
                    <p>Param Name: {param.name}</p>
                    <p>. Param Type:{param.type}</p>
                    <p>. Param Default:{param.default}</p>
                    <p>. Param Description:{param.description}</p>
                    <p>. Param Required:{param.required}</p>
                </div>
            )}
            <form onSubmit={addOutputParam}>
                <div className="input-group">
                    <br /><label htmlFor="html">add output param</label><br />
                    <input type="text" placeholder="param name" value={outputParamName} onChange={(e) => { setOutputParamName(e.target.value) }} />
                    <input type="text" placeholder="param type" value={outputParamType} onChange={(e) => { setOutputParamType(e.target.value) }} />
                    <br />
                    <button type="submit" className="dashboard-button">Add Output Param</button>
                </div>
            </form>
            {outputParams.map(param =>
                <div className="params-preview-container">
                    <p>Param Name: {param.name}</p>
                    <p>. Param Type:{param.type}</p>
                </div>
            )}
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag &amp; drop an image file here, or click to select one.</p>
            </div>
            {
                uploadedFile && (
                    <div>
                        <p>File: {uploadedFile.name}</p>
                        <button onClick={handleUpload}>upload</button>
                    </div>
                )
            }
        </div>
    );
}

export default AddModel;