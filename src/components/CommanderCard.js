import { Link } from "react-router-dom";
import "./CommanderCard.css"

// commander card in carousel on commanders page
export default function CommanderCard({commander}){

    //mansfeld's flag is black, rendering black text unreaddable
    //if commander's id corresponds to mansfeld, set its color to white
    const color = commander.id === 6 ? "white" : "black";
    
    return <article className="commander-card">
        <div className="commander-image">
            <img loading="lazy" src={commander.imageUrl} alt={commander.fullName} />
        </div>
        <Link to={`/commanders/${commander.id}`}>
        <div style={{
            backgroundImage: `url(${commander.loyaltyImageUrl})`,
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            }} className="commander-content">
            <h4 style={{color: color}}>{commander.fullName}</h4>
            <h4 style={{color: color}}>{commander.loyalty}</h4>
        </div>
        </Link>

    </article>
}

// bio
// birthDate
// birthPlace
// createdAt
// died
// fullName
// id
// imageUrl
// loyalty
// loyaltyImageUrl
// title
// updatedAt
