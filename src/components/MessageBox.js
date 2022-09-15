import "./MessageBox.css";
import { selectMessage } from "../store/appState/appStateSelectors";
import { useSelector } from "react-redux";

function MessageBox(){

    const message = useSelector(selectMessage);

    return <div className={message ? "message-box message-active" : "message-box" }>
        {message && <p>{message}</p>}
    </div>
}

export default MessageBox;