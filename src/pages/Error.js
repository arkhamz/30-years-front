import "./Error.css"
import { useNavigate } from "react-router-dom"
import {GiPikeman} from "react-icons/gi";

function Error(){

    const navigator = useNavigate();

    return <div className="error-page">
        <div className="message">
            <h1>Oops, this page does not exist... <span><GiPikeman/></span></h1>
            <button onClick={e => navigator("/atlas")}>Go to Atlas</button>
        </div>
    </div>
}

export default Error;