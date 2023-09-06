import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAdminLogin = () => {
const [error,setError] = useState(null)
const [isLoading,setIsLoading] = useState(null)
const {dispatch} = useAuthContext()

const login = async (username,pw) => { 
    setIsLoading(true)
    setError(null)


const response = await fetch('http://localhost:5000/api/admin/login/',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username,pw})
})

const json = await response.json()

if(!response.ok){
    setIsLoading(false)
    setError(json.error)

}

if(response.ok){
    localStorage.setItem('user', JSON.stringify(json))

    dispatch({type: 'LOGIN', payload: json})

    setIsLoading(false)

}

}
return { login,isLoading,error}
}
