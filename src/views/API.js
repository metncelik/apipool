import Banner from "../components/Banner";
import '../styles/views/API.css'
import SyntaxHighlighter from "react-syntax-highlighter";
import Playground from "../components/Playground";
import { paraisoDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { axiosPrivate } from "../api/axios";
import { useSnackbar } from "notistack";
import SEO from "../components/SEO";
import BaseSkeleton from "../components/sekeleton/BaseSkeleton";
import { APIListSkeleton } from "../components/sekeleton/APIListSkeleton";
import APISkeleton from "../components/sekeleton/APISkeleton";

const Code = ({ code }) => {
    return (
        <div className="code-container">
            <SyntaxHighlighter style={paraisoDark} customStyle={{ padding: "20px", backgroundColor: "#131a20", lineHeight: "1.7", fontSize: "14px" }} language={"JAVASCRIPT"} children={code} className={"code border-radius"} />
        </div>
    )
}

const getCodes = (apiAlias) => {
    return {
        "create_header": {
            "Python": "headers = {\n    \"Authorization\": \"Bearer YOUR_API_KEY\", #Get your api key from console\n}\n",
            "JavaScript": "const headers = {\n    'Authorization': 'Bearer YOUR_API_KEY', //Get your api key from console\n};\n",
            "Go": "headers := map[string]string{\n    \"Authorization\": \"Bearer YOUR_API_KEY\", //Get your api key from console\n}\n",
            "PHP": "$headers = array(\n    'Authorization: Bearer YOUR_API_KEY', //Get your api key from console\n);\n"
        },
        "create_body": {
            "Python": "body = {\n    \"parameter1\": \"value1\",\n    \"parameter2\": \"value2\"\n}\n",
            "JavaScript": "const body = {\n    \"parameter1\": \"value1\",\n    \"parameter2\": \"value2\"\n};\n",
            "Go": "body := map[string]interface{}{\n    \"parameter\": \"value\",\n    \"parameter2\": \"value2\",\n}\n",
            "PHP": "$body = {\n    \"parameter\": \"value\",\n    \"parameter2\": \"value2\"\n};\n"
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
                "    .then(response => {\n" +
                "        console.log(response.data);\n" +
                "    })\n" +
                "    .catch(error => {\n" +
                "        console.error(error);\n" +
                "});",

            "Go": "package main\n\n" +
                "import (\n" +
                "    \"bytes\"\n" +
                "    \"net/http\"\n" +
                ")\n\n" +
                "func main() {\n" +
                `    url := "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias}"  \n\n` +
                "    headers := headers  \n" +
                "    body := body  \n\n" +
                "    req, err := http.NewRequest(\"POST\", url, bytes.NewBuffer(body))\n" +
                "    if err != nil {\n" +
                "        panic(err)\n" +
                "    }\n\n" +
                "    for key, value := range headers {\n" +
                "        req.Header.Set(key, value)\n" +
                "    }\n\n" +
                "    client := &http.Client{}\n" +
                "    resp, err := client.Do(req)\n" +
                "    if err != nil {\n" +
                "        panic(err)\n" +
                "    }\n" +
                "    defer resp.Body.Close()\n\n" +
                "    // Process resp as needed\n" +
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
                "    response = requests.get(fetch_url)\n" +
                "    data = response.json()\n" +
                "    if response.status_code == 200 and data.get(\"status\") == \"COMPLETED\":\n" +
                "        print(data) \n" +
                "        break \n" +
                "    time.sleep(10)\n",
            "JavaScript": "const axios = require(\"axios\");\n" +
                "\n" +
                `\nconst id = "id"  // Replace with job id\nconst fetchUrl = \`${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias + "/status"}/\${id}\`;\n\n` +
                "for (let i = 0; i < 5; i++) {\n" +
                "    try {\n" +
                "        const response = await axios.get(fetchUrl);\n" +
                "        const data = response.data;\n" +
                "        if (response.status === 200 && data.status === \"COMPLETED\") {\n" +
                "            console.log(data); \n" +
                "            break; \n" +
                "        }\n" +
                "    } catch (error) {\n" +
                "        console.error(\"Error:\", error.message);\n" +
                "    }\n" +
                "    await new Promise(resolve => setTimeout(resolve, 10000));\n" +
                "}\n",
            "Go": "package main\n" +
                "\n" +
                "import (\n" +
                "    \"encoding/json\"\n" +
                "    \"fmt\"\n" +
                "    \"net/http\"\n" +
                "    \"time\"\n" +
                ")\n" +
                "\n" +
                "func main() {\n" +
                `\n    id := "id"  // Replace with job id\n    fetchUrl := "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias + "/status"}/" + id\n\n` +
                "    for i := 0; i < 5; i++ {\n" +
                "        resp, err := http.Get(fetchUrl)\n" +
                "        if err != nil {\n" +
                "            fmt.Println(\"Error:\", err)\n" +
                "            return\n" +
                "        }\n" +
                "        defer resp.Body.Close()\n" +
                "\n" +
                "        var data map[string]interface{}\n" +
                "        if resp.StatusCode == http.StatusOK {\n" +
                "            err := json.NewDecoder(resp.Body).Decode(&data)\n" +
                "            if err != nil {\n" +
                "                fmt.Println(\"Error decoding response:\", err)\n" +
                "                return\n" +
                "            }\n" +
                "            if status, ok := data[\"status\"].(string); ok && status == \"COMPLETED\" {\n" +
                "                fmt.Println(\"Response:\", data) \n" +
                "                break \n" +
                "            }\n" +
                "        }\n" +
                "        time.Sleep(10 * time.Second)\n" +
                "    }\n" +
                "}\n",
            "PHP": `$id = "id";  // Replace with job id\n$fetchUrl = "${process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + apiAlias + "/status"}/" . $id;\n\n` +
                "for ($i = 0; $i < 5; $i++) {\n" +
                "    $ch = curl_init(fetchUrl);\n" +
                "    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n" +
                "    $response = curl_exec($ch);\n" +
                "    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);\n" +
                "    curl_close($ch);\n" +
                "\n" +
                "    if ($httpCode === 200) {\n" +
                "        $data = json_decode($response, true);\n" +
                "        if (isset($data[\"status\"]) && $data[\"status\"] === \"COMPLETED\") {\n" +
                "            print_r($data); \n" +
                "            break; \n" +
                "        }\n" +
                "    }\n" +
                "    sleep(10);\n" +
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
    const [postURL, setPostURL] = useState("");
    const [fetchURL, setFetchURL] = useState("");

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

    useEffect(() => {
        if (api) {
            setPostURL(process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + api.alias);
            setFetchURL(process.env.REACT_APP_RUN_SERVICE_URL + "/v0/" + api.alias + "/status/");
        }
    }, [api]);

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
                            key={language + "-button"}
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
                    style={paraisoDark}
                    customStyle={{ padding: "15px", backgroundColor: "#131a20", lineHeight: "1.7", fontSize: "14px" }}
                    language={selectedLanguage.toLocaleLowerCase()}
                    children={codes[selectedLanguage]}
                    className={"code"}
                />
            </div>
        );
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="api-main">
                <Banner color={'#5ba3c7'} margin={150} height={300} />
                <div className="api-body container">
                    {isPending ?
                        <APISkeleton />
                        :
                        <>
                            <SEO title={api.title + " API | Try & Use | APIPOOL"} description={api.description} />
                            <h1 className="api-title">{api.title} API</h1>
                            <div className="urls-container">
                                <p className="url-container" onClick={() => { copyToClipBoard('post-url') }}>
                                    <span className="url-row">
                                        <span className="url-label">POST</span> &nbsp;
                                        <span className="api-url" id='post-url'>{postURL}</span>
                                    </span>

                                </p>
                                <p className="url-container" onClick={() => { copyToClipBoard('fetch-url') }}>
                                    <span className="url-row">
                                        <span className="url-label">GET</span> &nbsp;
                                        <span className="api-url" id="fetch-url">{fetchURL + ":id"}</span>
                                    </span>
                                </p>
                            </div>
                            <div className="description-container">
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

                            <h2 className="title-area">Playground</h2>
                            <Playground inputs={api.inputs} postURL={postURL} fetchURL={fetchURL} outputs={api.outputs} />

                            <div className="params-container">
                                <h2 className="title-area">
                                    Input Attributes
                                </h2>
                                <div className="table-container">

                                    <table className="params-table">
                                        <thead>
                                            <tr>
                                                <th className="left-align">Parameter</th>
                                                <th>Type</th>
                                                <th>Required</th>
                                                <th>Default</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {api.inputs.map((param) => (
                                                <tr key={param.title + "-row"}>
                                                    <td className="left-align">{param.title}</td>
                                                    <td
                                                        style={
                                                            {
                                                                textWrap: 'balance',
                                                                maxWidth: '200px',
                                                                overflow: 'auto',
                                                            }
                                                        }
                                                    >{param.type}</td>
                                                    <td>{param.is_required === true ? "yes" : param.is_required === false ? "no" : "depends"}</td>
                                                    <td>{param.default_value || "-"}</td>
                                                    <td className="left-align param-description">{param.description}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <h2 className="title-area">
                                    Output Attributes
                                </h2>
                                <div className="table-container">
                                    <table className="params-table">
                                        <thead>
                                            <tr>
                                                <th className="left-align">Parameter</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {api.outputs.map((param, index) => (
                                                <tr key={param.title + "-row"}>
                                                    <td className="left-align">{param.title}</td>
                                                    <td>{param.type || "-"}</td>
                                                    <td className="left-align param-description">{param.description}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="usage">
                                    <h2 className="title-area">
                                        Usage
                                    </h2>
                                    <div>
                                        <p>Create a headers variable with your API key.</p>
                                        <CodeWithHeader codes={codes.create_header} />
                                        <br />
                                        <p>Create a request body with the parameters in the table above.</p>
                                        <CodeWithHeader codes={codes.create_body} />
                                        <br />
                                        <p>Make a <span className="method-name">POST</span> request to the POST Endpoint with the header and body.
                                            {false &&
                                                <span> It will return the output.</span>
                                            }
                                        </p>
                                        <CodeWithHeader codes={codes.make_request} />
                                        <br />
                                        <div>
                                            <p>It will return a job id.</p>
                                            <Code code={"{\n    'id': 'XXXXX'\n}"} />
                                            <br />

                                            <p>After getting job id make a <span className="method-name">GET</span> request to the GET Endpoint. It will return the status of your request. When status is "COMPLETED" it will return the output.</p>
                                            <CodeWithHeader codes={codes.fetch} />
                                            <br />

                                        </div>
                                        <p>Response:</p>
                                        <Code code={"{\n    'status': 'COMPLETED',\n    'output': {}\n}"} />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

        </>
    );
}

export default API;                      