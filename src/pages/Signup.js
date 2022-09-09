import "./Signup.css"
import {useState} from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup(){
    
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigator = useNavigate()

    function handleSubmit(e){
        e.preventDefault();

        //clear fields
  
        //thunk will handle the re-direct  
    }

    return(
        <div className="signup-container">
            <form className="signup-form" onSubmit={e => e.preventDefault()} >
                <div className="signup-username">
                        <label htmlFor="signup-username">Username:</label>
                        <input id="signup-username" value={username} onChange={e => setUsername(e.target.value)} required type="text" />
                    </div>
                <div className="signup-email">
                    <label htmlFor="signup-email">Email:</label>
                    <input id="signup-email" value={email} onChange={e => setEmail(e.target.value)} required type="text" />
                </div>
                <div className="listing-form-bedroom">
                    <label htmlFor="signup-password">Password:</label>
                    <input id="signup-password" value={password} onChange={e => setPassword(e.target.value)}  required type="password" />

                </div>
               
                <div className="signup-form-button">
                    <button onClick={handleSubmit}>Signup</button>
                </div>
            </form>
         
        </div>
    )

}

export default Signup;