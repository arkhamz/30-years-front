import "./Login.css"
import {useState} from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(){
    
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
        <div className="login-container">
            <form className="login-form" onSubmit={e => e.preventDefault()} >
                <div className="login-email">
                    <label htmlFor="login-email">Email:</label>
                    <input id="login-email" value={email} onChange={e => setEmail(e.target.value)} required type="text" />
                </div>
                <div className="listing-form-bedroom">
                    <label htmlFor="login-password">Password:</label>
                    <input id="login-password" value={password} onChange={e => setPassword(e.target.value)}  required type="password" />

                </div>
               
                <div className="login-form-button">
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </form>
         
        </div>
    )

}

export default Login;