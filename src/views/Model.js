import Banner from "../components/Banner";
import '../styles/screens/Model.css'
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark, stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetModel } from "../database/db";
import Loading from "../components/Loading";

const CodeWithHeader = ({ codes }) => {
    const [selectedLanguage, setSelectedLanguage] = useState("Python");
    const languages = ['Python', "Go", 'JavaScript', 'PHP'];
    return (
        <div className="code-container">
            <div className="languages-container">
                {languages.map((language, index) => (
                    <button key={index} onClick={() => { setSelectedLanguage(language) }} className={`language ${language.toLocaleLowerCase()} ${selectedLanguage === language ? "selected-language" : ""}`}>
                        {language}
                    </button>
                ))
                }
            </div>
            <SyntaxHighlighter style={stackoverflowDark} language={selectedLanguage.toLocaleLowerCase()} children={codes[selectedLanguage]} className={"code"} />
        </div>
    )
}

const Code = ({ code }) => {
    return (
        <div className="code-container">
            <SyntaxHighlighter style={stackoverflowDark} children={code} className={"code border-radius"} />
        </div>
    )
}

const getCodes = (model) => {
    const codes = {
        "create_header": {
            "Python": "headers = {\n\t\"Authorization\": \"Bearer your_api_key\", # Sign Up to get your api key\n\t\"Content-Type\": \"application/json\"\n}\n",
            "JavaScript": "const headers = {\n\t'Authorization': 'Bearer your_api_key', // Sign Up to get your api key\n\t'Content-Type': 'application/json',\n};\n",
            "Go": "headers := map[string]string{\n\t\"Authorization\": \"Bearer your_api_key\", // Sign Up to get your api key\n\t\"Content-Type\": \"application/json\",\n}\n",
            "PHP": "$headers = array(\n\t'Authorization: Bearer your_api_key', // Sign Up to get your api key\n\t'Content-Type: application/json'\n);\n"
        },
        "create_body": {
            "Python": "body = {\n\t\"parameter\": \"value\",\n\t\"another_parameter\": \"another_value\"\n}\n",
            "JavaScript": "const body = array(\n\t'parameter' => 'value',\n\t'another_parameter' => 'another_value'\n);\n",
            "Go": "body := map[string]interface{}{\n\t\"parameter\": \"value\",\n\t\"another_parameter\": \"another_value\",\n}\n",
            "PHP": "$body = {\n\t\"parameter\": \"value\",\n\t\"another_parameter\": \"another_value\"\n}\n"
        },
        "make_request": {
            "Python": "import requests\n\n" +
                `url = \"${model.endpoint}\"\n\n` +
                "headers = headers # Replace with your actual headers\n" +
                "body = body # Replace with your actual body\n\n" +
                "response = requests.post(url, headers=headers, json=body)\n" +
                "print(response.text)",


            "JavaScript": "const axios = require(\"axios\");\n\n" +
                `const url = \"${model.endpoint}\";\n\n` +
                "const headers = headers  // Replace with your actual headers\n" +
                "const body = body  // Replace with your actual body\n\n" +
                "axios.post(url, body, { headers })\n" +
                "\t.then(response => {\n" +
                "\t\tconsole.log(response.data);\n" +
                "\t})\n" +
                "\t.catch(error => {\n" +
                "\t\tconsole.error(error);\n" +
                "\t});",


            "Go": "package main\n\n" +
                "import (\n" +
                "\t\"bytes\"\n" +
                "\t\"net/http\"\n" +
                ")\n\n" +
                "func main() {\n" +
                `\turl := \"${model.endpoint}\"\n\n` +
                "\theaders := headers  // Replace with your actual headers\n" +
                "\tbody := body  // Replace with your actual body\n\n" +
                "\treq, err := http.NewRequest(\"POST\", url, bytes.NewBuffer(body))\n" +
                "\tif err != nil {\n" +
                "\t\tpanic(err)\n" +
                "\t}\n\n" +
                "\tfor key, value := range headers {\n" +
                "\t\treq.Header.Set(key, value)\n" +
                "\t}\n\n" +
                "\tclient := &http.Client{}\n" +
                "\tresp, err := client.Do(req)\n" +
                "\tif err != nil {\n" +
                "\t\tpanic(err)\n" +
                "\t}\n" +
                "\tdefer resp.Body.Close()\n\n" +
                "\t// Process resp as needed\n" +
                "}",



            "PHP":
                `$url = \"${model.endpoint}\";\n\n` +
                "$headers = headers;  // Replace with your actual headers\n" +
                "$body = body;  // Replace with your actual body\n\n" +
                "$ch = curl_init($url);\n" +
                "curl_setopt($ch, CURLOPT_POST, true);\n" +
                "curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));\n" +
                "curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\n" +
                "curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n\n" +
                "$response = curl_exec($ch);\n" +
                "curl_close($ch);\n\n" +
                "echo $response;\n"
        },
        "fetch": {
            "Python":
                "import requests\n" +
                "import time\n" +
                `\nrequest_id = \"request_id\" # Replace with request id\nfetch_url = f\"${model.fetch_url}/{request_id}\"\n\n` +
                "for _ in range(5):\n" +
                "\tresponse = requests.get(fetch_url)\n" +
                "\tdata = response.json()\n" +
                "\tif response.status_code == 200 and data.get(\"status\") == \"COMPLETED\":\n" +
                "\t\tprint(data)  # Print the response data\n" +
                "\t\tbreak  # Break the loop if status is \"COMPLETED\"\n" +
                "\ttime.sleep(10)\n",
            "JavaScript": "const axios = require(\"axios\");\n" +
                "\n" +
                "(async () => {\n" +
                `\n\tconst requestId = \"request_id\"; // Replace with request id\n\tconst fetchUrl = \`${model.fetch_url}/\${requestId}\`;\n\n` +
                "\tfor (let i = 0; i < 5; i++) {\n" +
                "\t\ttry {\n" +
                "\t\t\tconst response = await axios.get(fetchUrl);\n" +
                "\t\t\tconst data = response.data;\n" +
                "\t\t\tif (response.status === 200 && data.status === \"COMPLETED\") {\n" +
                "\t\t\t\tconsole.log(data);  // Print the response data\n" +
                "\t\t\t\tbreak;  // Break the loop if status is \"COMPLETED\"\n" +
                "\t\t\t}\n" +
                "\t\t} catch (error) {\n" +
                "\t\t\tconsole.error(\"Error:\", error.message);\n" +
                "\t\t}\n" +
                "\t\tawait new Promise(resolve => setTimeout(resolve, 10000));\n" +
                "\t}\n" +
                "})();\n",
            "Go": "package main\n" +
                "\n" +
                "import (\n" +
                "\t\"encoding/json\"\n" +
                "\t\"fmt\"\n" +
                "\t\"net/http\"\n" +
                "\t\"time\"\n" +
                ")\n" +
                "\n" +
                "func main() {\n" +
                `\n\trequestId := \"request_id\" // Replace with request id\n\tfetchUrl := \"${model.fetch_url}/\" + requestId\n\n` +
                "\tfor i := 0; i < 5; i++ {\n" +
                `\t\tresp, err := http.Get(fetchUrl)\n` +
                "\t\tif err != nil {\n" +
                "\t\t\tfmt.Println(\"Error:\", err)\n" +
                "\t\t\treturn\n" +
                "\t\t}\n" +
                "\t\tdefer resp.Body.Close()\n" +
                "\n" +
                "\t\tvar data map[string]interface{}\n" +
                "\t\tif resp.StatusCode == http.StatusOK {\n" +
                "\t\t\terr := json.NewDecoder(resp.Body).Decode(&data)\n" +
                "\t\t\tif err != nil {\n" +
                "\t\t\t\tfmt.Println(\"Error decoding response:\", err)\n" +
                "\t\t\t\treturn\n" +
                "\t\t\t}\n" +
                "\t\t\tif status, ok := data[\"status\"].(string); ok && status == \"COMPLETED\" {\n" +
                "\t\t\t\tfmt.Println(\"Response:\", data)  // Print the response data\n" +
                "\t\t\t\tbreak  // Break the loop if status is \"COMPLETED\"\n" +
                "\t\t\t}\n" +
                "\t\t}\n" +
                "\t\ttime.Sleep(10 * time.Second)\n" +
                "\t}\n" +
                "}\n",
            "PHP":
                `$requestId = \"request_id\" // Replace with request id;\n$fetchUrl = \"${model.fetch_url}/" . $requestId;\n\n` +
                "for ($i = 0; $i < 5; $i++) {\n" +
                "\t$ch = curl_init(fetchUrl);\n" +
                "\tcurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n" +
                "\t$response = curl_exec($ch);\n" +
                "\t$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);\n" +
                "\tcurl_close($ch);\n" +
                "\n" +
                "\tif ($httpCode === 200) {\n" +
                "\t\t$data = json_decode($response, true);\n" +
                "\t\tif (isset($data[\"status\"]) && $data[\"status\"] === \"COMPLETED\") {\n" +
                "\t\t\tprint_r($data);  // Print the response data\n" +
                "\t\t\tbreak;  // Break the loop if status is \"COMPLETED\"\n" +
                "\t\t}\n" +
                "\t}\n" +
                "\tsleep(10);\n" +
                "}\n"
        }

    }
    return codes
}

const Model = () => {
    const { id } = useParams()
    const [model, setModel] = useState()
    const [codes, setCodes] = useState()
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        GetModel(id).then(
            data => {
                console.log(data);
                setModel(data);
                const codes = getCodes(data)
                setCodes(codes)
                setIsPending(false)
            }
        )
    }, [])

    // const model = {
    //     "name": "Realistic Vision v5.1",
    //     "id": "dfsdfd",
    //     "description": "Realistic Vision V5.1 is a fine-tuned Stable Diffusion model that trained for generating Realistic, Photographic images.",
    //     "method": "POST",
    //     "endpoint": "https://service.apipool.ai/stable_diffusion",
    //     "fetch": true,
    //     "fetch_url": "https://service.apipool.ai/stable_diffusion/fetch",
    //     "fetch_method": "GET",
    //     "input_params": [
    //         {
    //             "parameter": "model_id",
    //             "type": "str",
    //             "required": "yes",
    //             "default": "-",
    //             "description": "realistic_vision 5.1"
    //         },
    //         {
    //             "parameter": "key",
    //             "type": "str",
    //             "required": "yes",
    //             "default": "-",
    //             "description": "asdjka  l khu şk hş jh ş h şlkh şl kh şlk h şlkh şlk h lh"
    //         },
    //         {
    //             "parameter": "ekmek",
    //             "type": "str",
    //             "required": "yes",
    //             "default": "-",
    //             "description": "sucuk sadkjasşjdasşdjbasşjbd"
    //         },
    //         {
    //             "parameter": "model_id",
    //             "type": "str",
    //             "required": "yes",
    //             "default": "-",
    //             "description": "realistic_vision 5.1"
    //         },
    //         {
    //             "parameter": "model_id",
    //             "type": "str",
    //             "required": "yes",
    //             "default": "-",
    //             "description": "realistic_vision 5.1"
    //         }
    //     ],
    //     "output_params": "{\n\t'image': string [base64],\n\t'mask':string [base64]\n\t}"

    // }

   

    return (
        <div>
            {isPending ? 
                <div>
                <Loading/>
                </div>
                :
                <div className="model-main">
                <Banner title={`${model.name} API`} imageUrl={model.image_url}/>
                <div className="model-body container">
                    <div className="description-container">
                        <div className="title-area">
                            <h3 className="description-title">
                                Overview
                            </h3>
                        </div>
                        <div className="gap">
                            <p className="description-content">
                                {model.description} <br /><br />
                            </p>
                            <p className="url-container">
                                <div className="url-row">
                                    <div className="endpoint-label">Endpoint URL:</div> &nbsp;
                                    <a className="link" href={model.endpoint}>{model.endpoint}</a>
                                </div>
    
                            </p>
                            <p className="url-container">
                                <div className="url-row">
                                    <div className="endpoint-label">Fetch URL:</div> &nbsp;
                                    <a className="link" href={model.fetch_url}>{model.fetch_url}/{"\{request_id\}"}</a>
                                </div>
                            </p>
                        </div>
                    </div>
    
                    <div className="params-container">
                        <h3 className="params-title title-area">
                            Body Attributes
                        </h3>
                        <div className="table-container">
    
                            <table className="gap">
                                <tr>
                                    <th>parameter</th>
                                    <th>type</th>
                                    <th>required</th>
                                    <th>default</th>
                                    <th>description</th>
                                </tr>
                                {model.input_params.map((param, index) => (
                                    <tr>
                                        <td>{param.name}</td>
                                        <td className="centered-text">{param.type}</td>
                                        <td className="centered-text">{param.required}</td>
                                        <td className="centered-text">{param.default}</td>
                                        <td>{param.description}</td>
                                    </tr>
                                ))
                                }
                            </table>
                        </div>
    
                        <div className="usage">
                            <h3 className="title-area">
                                Usage
                            </h3>
                            <div className="gap">
                                <p>1- Create a headers variable with your API POOL Api Key.</p>
                                <CodeWithHeader codes={codes.create_header} />
                                <br />
                                <p>2- Create a request body with the parameters in the table above.</p>
                                <CodeWithHeader codes={codes.create_body} />
                                <br />
                                <p>3- Make a <span className="method-name">{model.method}</span> request to the Endpoint URL with the header and body.
                                    {!model.fetch &&
                                        <span> It will return the output</span>
                                    }
                                </p>
                                <CodeWithHeader codes={codes.make_request} />
                                <br />
                                {
                                    model.fetch &&
                                    (<div>
                                        <p>It will return a request id.</p>
                                        <Code code={"{\n'status':'RECIVED',\n'request_id': 'LKSD5765SDSA'\n}"} />
                                        <br />
    
                                        <p>4 - After getting request id make a <span className="method-name">{model.fetch_method}</span> request to the Fetch URL. It will return the status of your request. When status is "COMPLETED" it will return the output.</p>
                                        <CodeWithHeader codes={codes.fetch} />
                                        <br />
    
                                    </div>
                                    )
                                }
                                <p>Response:</p>
                                <Code code={"{\n'status':'COMPLETED',\n'output': 'LKSD5765SDSA'\n}"} />
                                <br />
    
                            </div>
                        </div>
    
                    </div>
                    {/* <div className="examples">
                        <h3 className="title-area">
                            Examples
                            </h3>
                        </div> */}
    
    
                </div>
            </div>}

        </div>
    );
}

export default Model;