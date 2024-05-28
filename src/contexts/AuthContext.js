import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({isLoggedIn: localStorage.getItem("isLoggedIn") === "true", accessToken: null});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthContext;