import { Link } from "react-router-dom"
import "./Footer.css"
import test from "../okayTest.svg";
import { AiFillFacebook, AiFillTwitterCircle,AiFillInstagram } from "react-icons/ai";

export default function Footer(){
    return <header className="home-footer">
        <div className="logo">
            <img className="footer-logo" src={test} alt="" />
        </div>
        <div className="internal">
            <Link to="#">Thirty Years' War</Link>
            <Link to="#">Mongol Conquest</Link>
            <Link to="#">Zulu War</Link>
        </div>
        <div className="social">
                <AiFillFacebook/>
                <AiFillTwitterCircle/>
                <AiFillInstagram/>
        </div>
    </header>
}