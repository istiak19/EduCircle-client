import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const signup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSign = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateProfileUser = (update) => {
        return updateProfile(auth.currentUser, update)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser?.email) {
                const user = { email: currentUser.email }
                axios.post('https://educircle-server.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data);
                        setLoading(false)
                    })
            }
            else {
                axios.post('https://educircle-server.vercel.app/logout', {}, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data)
                        setLoading(false)
                    })
            }
        })
        return () => unsubscribe()
    }, [])

    const signOutUser = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        signup,
        signin,
        googleSign,
        signOutUser,
        updateProfileUser,
        isDarkMode,
        toggleTheme
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;