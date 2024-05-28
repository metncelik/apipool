import { createContext, useState } from "react";

const ConsoleContext = createContext("");

export const ConsoleProvider = ({ children }) => {
    const [consoleState, setConsoleState] = useState({});
    return (
        <ConsoleContext.Provider value={[consoleState, setConsoleState]}>
            {children}
        </ConsoleContext.Provider>
    );
};

export default ConsoleContext;