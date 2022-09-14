import "./Error.js"
import { useNavigate } from "react-router-dom"
import {GiPikeman} from "react-icons/gi";

function Error(){

    const navigator = useNavigate();

    return <div className="error-page">
        <div className="message">
            <h1>Whoops, this page does not exist...</h1>
            <button onClick={e => navigator("/atlas")}>Go to Atlas</button>
        </div>
        <div className="logo">
            <GiPikeman/>
        </div>
        
    </div>
}

export default Error;