import { useSelector } from "react-redux"
import "./Spinner.css"
import { selectLoading } from "../store/appState/appStateSelectors"
import { GiCrossedSwords } from "react-icons/gi";


function Spinner(){

    const loading = useSelector(selectLoading);

    return <>
        {loading && (
            <div className="spinner-container">
            <span className="sword sword-1"><GiCrossedSwords/></span>
            <span className="sword sword-2"><GiCrossedSwords/></span>
            <span className="sword sword-3"><GiCrossedSwords/></span>
            </div>
        )}

    </>
}

export default Spinner;



// function Spinner(){

//     const loading = useSelector(selectLoading);

//     return <div className="spinner-container">
//         {loading && (
//             <span className="spinner"></span>
//         )}

//     </div>
// }

// export default Spinner;