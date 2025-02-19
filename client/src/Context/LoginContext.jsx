import React from 'react'
import { createContext, useState } from "react";
const myLoginContext = createContext();

const LoginContext=({children})=>{
    const [isLogedIn, setIsLogedIn]= useState(false);
    return(
        <>
         <myLoginContext.Provider value={{isLogedIn, setIsLogedIn}}>
            {children}
         </myLoginContext.Provider>
                       
        </>
    )
}

export default LoginContext;
export  {myLoginContext};