import {createContext, useState} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    const hello = () => {
        console.log("hello");
    }

    return(
        <AuthContext.Provider value = {{auth, setAuth, hello}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;