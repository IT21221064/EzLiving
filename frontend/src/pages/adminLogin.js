import { useState } from "react";
import { useAdminLogin } from '../hooks/useAdminLogin'

const AdminLogin = () =>{
    const [username,setUser] = useState('')
    const [pw,setPW] =useState('')
    const {login ,error,isLoading} = useAdminLogin()

    const handleSubmit = async(e) =>{
        e.preventDefault()

        await login(username,pw)

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Admin Login</h3>

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={username}  
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPW(e.target.value)}
                value={pw}  
            />
            <br/>

<button className="btnSubmit" disabled = {isLoading}>Login</button>
        {error && <div className="error">{error}</div>}


        </form>
    )



}

export default AdminLogin