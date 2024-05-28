import Banner from "../components/Banner";
import '../styles/views/Model.css'
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { axiosPrivate } from "../api/axios";

const Code = ({ code }) => {
    return (
        <div className="code-container">
            <SyntaxHighlighter style={stackoverflowDark} customStyle={{ padding: "20px" }} language={"JAVASCRIPT"} children={code} className={"code border-radius"} />
        </div>
    )
}

const getCodes = (modelAlias) => {
    return {
        "create_header": {
            "Python": "headers = {\n\t\"Authorization\": \"API_KEY\", # Get your api key from console\n}\n",
            "JavaScript": "const headers = {\n\t'Authorization': 'API_KEY', // Get your api key from console\n};\n",
            "Go": "headers := map[string]string{\n\t\"Authorization\": \"API_KEY\", // Get your api key from console\n}\n",
            "PHP": "$headers = array(\n\t'Authorization: API_KEY', // Get your api key from console\n);\n"
        },
        "create_body": {
            "Python": "body = {\n\t\"parameter1\": \"value1\",\n\t\"parameter2\": \"value2\"\n}\n",
            "JavaScript": "const body = {\n\t\"parameter1\": \"value1\",\n\t\"parameter2\": \"value2\"\n};\n",
            "Go": "body := map[string]interface{}{\n\t\"parameter\": \"value\",\n\t\"parameter2\": \"value2\",\n}\n",
            "PHP": "$body = {\n\t\"parameter\": \"value\",\n\t\"parameter2\": \"value2\"\n};\n"
        },
        "make_request": {
            "Python": "import requests\n\n" +
                `url = "${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias}" \n\n` +
                "headers = headers \n" +
                "body = body \n\n" +
                "response = requests.post(url, headers=headers, json=body)\n" +
                "print(response.text)",

            "JavaScript": "const axios = require(\"axios\");\n\n" +
                `const url = "${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias}";  \n\n` +
                "const headers = headers  \n" +
                "const body = body  \n\n" +
                "axios.post(url, body, { headers })\n" +
                "\t.then(response => {\n" +
                "\t\tconsole.log(response.data);\n" +
                "\t})\n" +
                "\t.catch(error => {\n" +
                "\t\tconsole.error(error);\n" +
                "});",

            "Go": "package main\n\n" +
                "import (\n" +
                "\t\"bytes\"\n" +
                "\t\"net/http\"\n" +
                ")\n\n" +
                "func main() {\n" +
                `\turl := "${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias}"  \n\n` +
                "\theaders := headers  \n" +
                "\tbody := body  \n\n" +
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
                `$url = "${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias}";  \n\n` +
                "$headers = headers;  \n" +
                "$body = body;  \n\n" +
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
                `\nid = "id"  # Replace with job id\nfetch_url = f"${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias + "/status"}/{id}"\n\n` +
                "for _ in range(5):\n" +
                "\tresponse = requests.get(fetch_url)\n" +
                "\tdata = response.json()\n" +
                "\tif response.status_code == 200 and data.get(\"status\") == \"completed\":\n" +
                "\t\tprint(data) \n" +
                "\t\tbreak \n" +
                "\ttime.sleep(10)\n",
            "JavaScript": "const axios = require(\"axios\");\n" +
                "\n" +
                `\nconst id = "id"  // Replace with job id\nconst fetchUrl = \`${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias + "/status"}/\${id}\`;\n\n` +
                "for (let i = 0; i < 5; i++) {\n" +
                "\ttry {\n" +
                "\t\tconst response = await axios.get(fetchUrl);\n" +
                "\t\tconst data = response.data;\n" +
                "\t\tif (response.status === 200 && data.status === \"completed\") {\n" +
                "\t\t\tconsole.log(data); \n" +
                "\t\t\tbreak; \n" +
                "\t\t}\n" +
                "\t} catch (error) {\n" +
                "\t\tconsole.error(\"Error:\", error.message);\n" +
                "\t}\n" +
                "\tawait new Promise(resolve => setTimeout(resolve, 10000));\n" +
                "}\n",
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
                `\n\tid := "id"  // Replace with job id\n\tfetchUrl := "${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias + "/status"}/" + id\n\n` +
                "\tfor i := 0; i < 5; i++ {\n" +
                "\t\tresp, err := http.Get(fetchUrl)\n" +
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
                "\t\t\tif status, ok := data[\"status\"].(string); ok && status == \"completed\" {\n" +
                "\t\t\t\tfmt.Println(\"Response:\", data) \n" +
                "\t\t\t\tbreak \n" +
                "\t\t\t}\n" +
                "\t\t}\n" +
                "\t\ttime.Sleep(10 * time.Second)\n" +
                "\t}\n" +
                "}\n",
            "PHP": `$id = "id";  // Replace with job id\n$fetchUrl = "${process.env.REACT_APP_SERVICE_URL + "/v0/" + modelAlias + "/status"}/" . $id;\n\n` +
                "for ($i = 0; $i < 5; $i++) {\n" +
                "\t$ch = curl_init(fetchUrl);\n" +
                "\tcurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n" +
                "\t$response = curl_exec($ch);\n" +
                "\t$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);\n" +
                "\tcurl_close($ch);\n" +
                "\n" +
                "\tif ($httpCode === 200) {\n" +
                "\t\t$data = json_decode($response, true);\n" +
                "\t\tif (isset($data[\"status\"]) && $data[\"status\"] === \"completed\") {\n" +
                "\t\t\tprint_r($data); \n" +
                "\t\t\tbreak; \n" +
                "\t\t}\n" +
                "\t}\n" +
                "\tsleep(10);\n" +
                "}\n"
        }
    }
}

const Model = () => {
    const { alias } = useParams()
    const [model, setModel] = useState()
    const [codes, setCodes] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [selectedLanguage, setSelectedLanguage] = useState("Python");

    useEffect(() => {
        const getData = async () => {
            setIsPending(true);
            const response = await axiosPrivate("/models/by-alias/" + alias);
            const modelData = response.data.model;
            setModel(modelData);
            setCodes(getCodes(modelData.alias));
            setIsPending(false);
        };
        getData();
    }, [alias]);

    const CodeWithHeader = ({ codes, language }) => {
        const languages = [
            'Python',
            "Go",
            'JavaScript',
            'PHP'
        ];
        return (
            <div className="code-container">
                <div className="languages-container">
                    {languages.map((language, index) => (
                        <button
                            key={index}
                            onClick={() => { setSelectedLanguage(language) }}
                            className={`language ${language.toLocaleLowerCase()} 
                            ${selectedLanguage === language ? "selected-language" : ""}`}
                        >
                            {language}
                        </button>
                    ))
                    }
                </div>
                <SyntaxHighlighter
                    style={stackoverflowDark}
                    customStyle={{ padding: "15px" }}
                    language={selectedLanguage.toLocaleLowerCase()}
                    children={codes[selectedLanguage]}
                    className={"code"}
                />
            </div>
        );
    };

    return (
        <div>
            {isPending ?
                <div>
                    <Loading />
                </div>
                :
                <div className="model-main">
                    <Banner title={`${model.title} API`} imageUrl={model.image_url} />
                    <div className="model-body container">
                        <div className="description-container">
                            <div className="title-area">
                                <h3 className="description-title">
                                    Info
                                </h3>
                            </div>
                            <div className="gap">
                                <p className="description-content">
                                    {model.description} <br /><br />
                                </p>
                                <p className="url-container">
                                    <div className="url-row">
                                        <div className="endpoint-label">Endpoint URL:</div> &nbsp;
                                        <p className="link" >{process.env.REACT_APP_SERVICE_URL + "/v0/" + model.alias}</p>
                                    </div>

                                </p>
                                <p className="url-container">
                                    <div className="url-row">
                                        <div className="endpoint-label">Fetch URL:</div> &nbsp;
                                        <p className="link">{process.env.REACT_APP_SERVICE_URL + "/v0/" + model.alias + "/status/:id"}</p>
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
                                    {model.inputs.map((param, index) => (
                                        <tr>
                                            <td className="centered-text">{param.title}</td>
                                            <td className="centered-text">{param.type}</td>
                                            <td className="centered-text">{param.is_required ? "yes" : "no"}</td>
                                            <td className="centered-text">{param.default_value || "-"}</td>
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
                                    <p>1- Create a headers variable with your API key.</p>
                                    <CodeWithHeader codes={codes.create_header} />
                                    <br />
                                    <p>2- Create a request body with the parameters in the table above.</p>
                                    <CodeWithHeader codes={codes.create_body} />
                                    <br />
                                    <p>3- Make a <span className="method-name">POST</span> request to the Endpoint URL with the header and body.
                                        {false &&
                                            <span> It will return the output.</span>
                                        }
                                    </p>
                                    <CodeWithHeader codes={codes.make_request} />
                                    <br />
                                    <div>
                                        <p>It will return a job id.</p>
                                        <Code code={"{\n\t'id': 'XXXXX'\n}"} />
                                        <br />

                                        <p>4 - After getting job id make a <span className="method-name">GET</span> request to the Fetch URL. It will return the status of your request. When status is "completed" it will return the output.</p>
                                        <CodeWithHeader codes={codes.fetch} />
                                        <br />

                                    </div>
                                    <p>Response:</p>
                                    <Code code={"{\n\t'status': 'completed',\n\t'output': {}\n}"} />
                                    <br />
                                </div>
                            </div>

                        </div>
                        <h3 className="params-title title-area">
                            Output Attributes
                        </h3>
                        <div className="table-container">
                            <table className="gap">
                                <tr>
                                    <th>parameter</th>
                                    <th>type</th>
                                    <th>description</th>
                                </tr>
                                {model.outputs.map((param, index) => (
                                    <tr>
                                        <td className="centered-text">{param.title}</td>
                                        <td className="centered-text">{param.type || "-"}</td>
                                        <td>{param.description}</td>
                                    </tr>
                                ))
                                }
                            </table>
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