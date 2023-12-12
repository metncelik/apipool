import { getAuth } from "firebase/auth";

export const removeEmail = () => {
    const auth = getAuth()
    auth.signOut()
    localStorage.removeItem("apipool_email")
}