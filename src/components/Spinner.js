import { useSelector } from "react-redux"
import "./Spinner.css"
import { selectLoading } from "../store/appState/appStateSelectors"


function Spinner(){

    const loading = useSelector(selectLoading);

    return <div className="spinner-container">
        {loading && (
            <span className="spinner"></span>
        )}

    </div>
}

export default Spinner;