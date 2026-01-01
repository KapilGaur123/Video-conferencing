import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {

    const [users, setUsers] = useState({})

    return(
        <AuthContext.Provider value={{users, setUsers}}>
            {children}
        </AuthContext.Provider>
    )
}
