import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";





const  UserProfile = () => {
    const [User,setUser] = useState(null)

    const{user} = useAuthContext()

    useEffect(() =>{

        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:5000/api/users/${user.userid}`)
            const json = await response.json()

            if(response.ok)
            {
                setUser(json)
            }
        }
        if(user != null){
            
            fetchProfile()}
    },[user])

    return(
        <div className="container">
            
        
            <h1>HELLO {User?.name ?? 'null'}!</h1><br/>
            <h2>Here is your profile details</h2>
            <br/><br/>

            <div className="formbox1">
                <p>Name   : {User?.name ?? 'null'}</p>
                <p>NIC    : {User?.NIC ?? 'null'}</p>
                <p>Email  : {User?.email ?? 'null'}</p>
                <p>Type   : {User?.type ?? 'null'}</p>
                


            </div><br></br>
            <br/>
            <a href="/UpdateProfile"><button className="btnupdate">Edit Profile</button></a>
            
          


            
            
        
    </div>
    )
}

export default UserProfile;