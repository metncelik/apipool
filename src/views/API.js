import Banner from "../components/Banner";
import '../styles/views/API.css'
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { axiosPrivate } from "../api/axios";
import { useSnackbar } from "notistack";

const Code = ({ code }) => {
    return (
        <div className="code-container">
            <SyntaxHighlighter style={stackoverflowDark} customStyle={{ padding: "20px" }} language={"JAVASCRIPT"} children={code} className={"code border-radius"} />
        </div>
    )
}

const getCodes = (apiAlias) => {
    return {
        "create_header": {
            "Python": "headers = {\n\t\"Authorization\": \"Bearer API_KEY\", #Get your api key from console\n}\n",
            "JavaScript": "const headers = {\n\t'Authorization': 'Bearer API_KEY', //Get your api key from console\n};\n",
            "Go": "headers := map[string]string{\n\t\"Authorization\": \"Bearer API_KEY\", //Get your api key from console\n}\n",
            "PHP": "$headers = array(\n\t'Authorization: Bearer API_KEY', //Get your api key from console\n);\n"
        },
        "create_body": {
            "Python": "body = {\n\t\"parameter1\": \"value1\",\n\t\"parameter2\": \"value2\"\n}\n",
            "JavaScript": "const body = {\n\t\"parameter1\": \"value1\",\n\t\"parameter2\": \"value2\"\n};\n",
            "Go": "body := map[string]interface{}{\n\t\"parameter\": \"value\",\n\t\"parameter2\": \"value2\",\n}\n",
            "PHP": "$body = {\n\t\"parameter\": \"value\",\n\t\"parameter2\": \"value2\"\n};\n"
        },
        "make_request": {
            "Python": "import requests\n\n" +
                `url = "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias}" \n\n` +
                "headers = headers \n" +
                "body = body \n\n" +
                "response = requests.post(url, headers=headers, json=body)\n" +
                "print(response.text)",

            "JavaScript": "const axios = require(\"axios\");\n\n" +
                `const url = "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias}";  \n\n` +
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
                `\turl := "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias}"  \n\n` +
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
                `$url = "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias}";  \n\n` +
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
                `\nid = "id"  # Replace with job id\nfetch_url = f"${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias + "/status"}/{id}"\n\n` +
                "for _ in range(5):\n" +
                "\tresponse = requests.get(fetch_url)\n" +
                "\tdata = response.json()\n" +
                "\tif response.status_code == 200 and data.get(\"status\") == \"completed\":\n" +
                "\t\tprint(data) \n" +
                "\t\tbreak \n" +
                "\ttime.sleep(10)\n",
            "JavaScript": "const axios = require(\"axios\");\n" +
                "\n" +
                `\nconst id = "id"  // Replace with job id\nconst fetchUrl = \`${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias + "/status"}/\${id}\`;\n\n` +
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
                `\n\tid := "id"  // Replace with job id\n\tfetchUrl := "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias + "/status"}/" + id\n\n` +
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
            "PHP": `$id = "id";  // Replace with job id\n$fetchUrl = "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias + "/status"}/" . $id;\n\n` +
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

const API = () => {
    const { alias } = useParams()
    const [api, setAPI] = useState()
    const [codes, setCodes] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [selectedLanguage, setSelectedLanguage] = useState("Python");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getData = async () => {
            setIsPending(true);
            const response = await axiosPrivate("/apis/by-alias/" + alias);
            setIsPending(false);
            if (!response) return;
            const apiData = response.data.api;
            setAPI(apiData);
            setCodes(getCodes(apiData.alias));
        };
        getData();
    }, [alias]);

    const copyToClipBoard = (id) => {
        navigator.clipboard.writeText(document.getElementById(id).innerText);
        enqueueSnackbar("Copied to clipboard", { variant: "default" });
    }

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
                <div className="api-main">
                    <Banner image={api.image_url} margin={150} height={300}/>
                    <div className="api-body container">
                        <h1 className="api-title">{api.title} API</h1>
                        <div className="description-container">
                            <div className="urls-container">
                                <p className="url-container" onClick={() => { copyToClipBoard('fetch-url') }}>
                                    <div className="url-row">
                                        <div className="api-label">POST</div> &nbsp;
                                        <p className="api-url" id="fetch-url">{process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + api.alias}</p>
                                    </div>

                                </p>
                                <p className="url-container" onClick={() => { copyToClipBoard('fetch-url') }}>
                                    <div className="url-row">
                                        <div className="api-label">GET</div> &nbsp;
                                        <p className="api-url" id="get-url">{process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + api.alias + "/status/:id"}</p>
                                    </div>
                                </p>
                            </div>
                            {/* <div className="title-area">
                                <h2 className="description-title">
                                    Info
                                </h2>
                            </div> */}
                            <div className="gap section">
                                <p className="description-content">
                                    {api.description} <br /><br />
                                </p>
                            </div>
                        </div>

                        <div className="params-container">
                            <h2 className="params-title title-area">
                                Body Attributes
                            </h2>
                            <div className="table-container">

                                <table className="gap">
                                    <tr>
                                        <th className="left-align">Parameter</th>
                                        <th>Type</th>
                                        <th>Required</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                    {api.inputs.map((param, index) => (
                                        <tr>
                                            <td className="left-align">{param.title}</td>
                                            <td>{param.type}</td>
                                            <td>{param.is_required !== null ? param.is_required.toString() : "-"}</td>
                                            <td>{param.default_value || "-"}</td>
                                            <td className="left-align param-description">{param.description}</td>
                                        </tr>
                                    ))
                                    }
                                </table>
                            </div>
                            <h2 className="params-title title-area">
                                Output Attributes
                            </h2>
                            <div className="table-container">
                                <table className="gap">
                                    <tr>
                                        <th  className="left-align">Parameter</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                    </tr>
                                    {api.outputs.map((param, index) => (
                                        <tr key={`output-param${index}`}>
                                            <td className="left-align">{param.title}</td>
                                            <td>{param.type || "-"}</td>
                                            <td className="left-align param-description">{param.description}</td>
                                        </tr>
                                    ))
                                    }
                                </table>
                            </div>

                            <div className="usage">
                                <h2 className="title-area">
                                    Usage
                                </h2>
                                <div className="gap">
                                    <p>Create a headers variable with your API key.</p>
                                    <CodeWithHeader codes={codes.create_header} />
                                    <br />
                                    <p>Create a request body with the parameters in the table above.</p>
                                    <CodeWithHeader codes={codes.create_body} />
                                    <br />
                                    <p>Make a <span className="method-name">POST</span> request to the API URL with the header and body.
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

                                        <p>After getting job id make a <span className="method-name">GET</span> request to the Get URL. It will return the status of your request. When status is "completed" it will return the output.</p>
                                        <CodeWithHeader codes={codes.fetch} />
                                        <br />

                                    </div>
                                    <p>Response:</p>
                                    <Code code={"{\n\t'status': 'completed',\n\t'output': {}\n}"} />
                                    <br />
                                </div>
                            </div>

                        </div>

                        {/* <div className="examples">
                        <h2 className="title-area">
                            Examples
                            </h2>
                        </div> */}


                    </div>
                </div>}

        </div>
    );
}

export default API;