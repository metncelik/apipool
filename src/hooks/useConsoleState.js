import { useContext } from "react";
import ConsoleContext from "../contexts/ConsoleContext";

const useConsoleState = () => {
    return useContext(ConsoleContext);
}

export default useConsoleState;