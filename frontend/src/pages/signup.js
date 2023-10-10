import {  useState,useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import './Signup.css'
//import Swal from 'sweetalert2';

const Signup = () => {
    const [name, setName] = useState('')
    const [NIC, setNIC] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUser] = useState('')
    const [pw, setPW] = useState('')
    const [type,setType] = useState('')
    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const {user} = useAuthContext()
    const [emptyFields, setEmptyFields] = useState([])
    const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

    

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const user = {name,NIC,email,username,pw,type}
        

        

        const response = await fetch('http://localhost:5000/api/users', {
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${user.token}`
            }
        })

        

        const json = await response.json()
       
        
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            if(json.emptyFields){
                setEmptyFields(json.emptyFields)
            }
            
        
        }

        if(response.ok )
        {
            setName('')
            setNIC('')
            setEmail('')
            setUser('')
            setPW('')
            setType('')
            setError(null)
            setEmptyFields([])
            localStorage.setItem('user', JSON.stringify(json))
            console.log('new user added')


            dispatch({type:'LOGIN',payload: json})

            
        }


    }
    
    useEffect(() => {
        if (!hasSpokenWelcome) {
          // Wait for voices to be available
         
            const message = new SpeechSynthesisUtterance("now you are at sign up page");
             // Change the voice if needed
            window.speechSynthesis.speak(message);
            setHasSpokenWelcome(true);
        
        }
        return () => {
          window.speechSynthesis.cancel();
        };
      }, [0]);

    return (
        <div className="signpage">
            
        <div className="signcard">
        <h3 className="topic">User Registration</h3>
        <form className="signup" onSubmit={handleSubmit}>
            
            <label>Name:</label>
            <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ""}/>
                <br></br>

            <label>NIC:</label>
            <input
                type="text"
                onChange={(e) => setNIC(e.target.value)}
                value={NIC}
                className={emptyFields.includes('NIC') ? 'error' : ""}/><br/>

            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes('email') ? 'error' : ""}/><br/>

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={username}
                className={emptyFields.includes('username') ? 'error' : ""}/>  <br/>  

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPW(e.target.value)}
                value={pw}
                className={emptyFields.includes('pw') ? 'error' : ""}/><br/>

            <label>Type:</label><br/>
            <select
               onChange={(e) => setType(e.target.value)}
               value={type}
              className={emptyFields.includes('type') ? 'error' : ""}
            >
                 <option value="">Select Type</option>
                 <option value="deuteranopia">Deuteranopia</option>
                 <option value="protanopia">Protanopia</option>
                 <option value="tritanopia">Tritanopia</option>
            </select><br/>


            <button className="btnSubmit" disabled={isLoading}>Register</button>
            {error && <div className="error">{error}</div>}

            

        </form>
        </div>
        </div>
    )


}

export default Signup