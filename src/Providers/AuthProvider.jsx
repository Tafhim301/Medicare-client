import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from '../Hooks/useAxiosPublic'


export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
   
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setLoading(false);
                setUser(currentUser);
                console.log(currentUser);
                axiosPublic.post('/jwt', currentUser)
                    .then(res => {
                      
                        localStorage.setItem('access-token',res.data.token)
                    })


            }
            else {
                setLoading(false);
                setUser(null)
                localStorage.removeItem('access-token')
            }
        })

        return () =>
            unSubscribe();


    }, [axiosPublic])



    const authInfo = {
        user,
        loading,
        signUp,
        login,
        googleLogin,
        logOut,
        updateUserProfile,
        


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }

        </AuthContext.Provider>
    );
};

export default AuthProvider;