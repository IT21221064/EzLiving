
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Swal from 'sweetalert2';



const  UpdateProfile = () => {
    
    const [name,setName] = useState(null)
    
    const [NIC,setNIC] = useState(null)
    
    const [email,setEmail] = useState(null)
    const [username,setUsername] = useState(null)
    const [pw,setPW] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)
    const {user} = useAuthContext()


    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:5000/api/users/${user.userid}`)
            const json = await response.json()
            console.log(json)

            if(response.ok)
            {
                
                setName(json.name)
                
                setEmail(json.email)
                setUsername(json.username)
                
                setPW(json.pw)
                setNIC(json.NIC)
            }
        }
        fetchProfile()
    },[user])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(`http://localhost:5000/api/users/${user.userid}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              email,
              
              pw,
              
              username,
              
              NIC,
            })
          })

          const json1 = await response.json()

          if (response.ok) {
            setError(null)
            setEmptyFields([])
            Swal.fire(
                {
                  title: 'Success',
                  text: 'Record has been updated',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true  
              }
              )
          }
          else{
            setError(json1.error)
            setEmptyFields(json1.emptyFields)
          }
        } catch (error) {
          console.log(error)
        }
      }


    return(
        
        <div className="container">
            
        
            

            <form onSubmit = {handleUpdate} className="form">
            <label>Name</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setName(e.target.value)}
             value={name}
             className={emptyFields.includes('name') ? 'error' : ""}
            />
            <label>NIC</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setNIC(e.target.value)}
             value={NIC}
             className={emptyFields.includes('NIC') ? 'error' : ""}
            />
            <label>Email</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             className={emptyFields.includes('email') ? 'error' : ""}
            />
            
            
            <label>Username</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setNIC(e.target.value)}
             value={username}
             className={emptyFields.includes('username') ? 'error' : ""}
            />
            <label>Password</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setEmail(e.target.value)}
             value={pw}
             className={emptyFields.includes('pw') ? 'error' : ""}
            /><br/>
            <button className="btnSubmit" type="submit">Update</button>
            {error && <div className="error">{error}</div>}
            </form>
            
        
    </div>
    )

}

export default UpdateProfile;