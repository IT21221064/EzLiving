import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./userprofile.css";





const  UserProfile = () => {
    const [User,setUser] = useState(null)
    const [type, setType] = useState("");
    const{user} = useAuthContext()
    const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);

    useEffect(() =>{

        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:5000/api/users/${user.userid}`)
            const json = await response.json()

            if(response.ok)
            {
                setUser(json)
                setType(json.type);
            }
        }
        if(user != null){
            
            fetchProfile()}
    },[user])
    useEffect(() => {
        const importCSSBasedOnType = async () => {
          switch (type) {
            case "deuteranopia":
               import("../pages/colorblinds/profile/deuteranopiaItemlist.css");
              break;
            case "protanopia":
               import("../pages/colorblinds/profile/protanopiaItemlist.css");
              break;
            case "tritanopia":
               import("../pages/colorblinds/profile/tritanopiaItemlist.css");
              break;
            default:
               import("./ProductList.css"); 
              break;
          }
        };
    
        importCSSBasedOnType();
      }, [type]);
    
    useEffect(() => {
        if (!hasSpokenWelcome) {
          // Wait for voices to be available
         
            const message = new SpeechSynthesisUtterance("now you are at profile page");
             // Change the voice if needed
            window.speechSynthesis.speak(message);
            setHasSpokenWelcome(true);
        
        }
        return () => {
          window.speechSynthesis.cancel();
        };
      }, [0]);
      
    

    return(
    <div>
        <Navbar/><br></br>
        <div className="Ucontainer">
            
        
            <h1 className="Utitle">HELLO {User?.name ?? 'null'}!</h1><br/>
            <h2 className="Utitle2">Here is your profile details</h2>
            <br/><br/>

            <div className="formbox1">
                <p>Name   : {User?.name ?? 'null'}</p>
                <p>NIC    : {User?.NIC ?? 'null'}</p>
                <p>Email  : {User?.email ?? 'null'}</p>
                <p>Type   : {User?.type ?? 'null'}</p>
                


            </div><br></br>
            <br/>

            <a href="/UpdateProfile"><button className="btnupdate2">Edit Profile</button></a>

            <br/>
            <br/>
            <a href="/userreview"><button className="btnupdate2">My Reviews</button></a>

            
          


            
            
        
    </div>
    <br></br>
    <br></br>
    <Footer/>
    </div>
    )
}

export default UserProfile;