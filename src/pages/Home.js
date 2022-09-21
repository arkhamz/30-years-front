import { useNavigate } from "react-router-dom";
// import { Fade } from "react-awesome-reveal";
import SpringFade from "../components/Fade";
import "./Home.css";
import Footer from "../components/Footer";
// import sand1 from "../sand1.svg";
// import sand2 from "../sand2.svg";


function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.7 308.55">
      <g fill="none" stroke="#000" strokeWidth="10">
        <path
          d="M169.078 137.442a82.03 25.836 0 11-164.06 0 82.03 25.836 0 11164.06 0z"
          transform="translate(-308.66 -170.24) translate(308.65 63.64)"
        ></path>
        <path
          d="M5.857 140.93v50.714c0 26.364 61.43 37.705 61.43 61.429v11.429"
          transform="translate(-308.66 -170.24) translate(308.65 63.64) translate(-.837 -3.472)"
        ></path>
        <path
          d="M5.857 388.01v-50.714c0-26.364 61.43-37.705 61.43-61.429v-11.429"
          transform="translate(-308.66 -170.24) translate(308.65 63.64) translate(-.837 -3.472)"
        ></path>
        <path
          d="M5.857 140.93v50.714c0 26.364 61.43 37.705 61.43 61.429v11.429"
          transform="translate(-308.66 -170.24) translate(308.65 63.64) matrix(-1 0 0 1 174.94 -3.472)"
        ></path>
        <path
          d="M5.857 388.01v-50.714c0-26.364 61.43-37.705 61.43-61.429v-11.429"
          transform="translate(-308.66 -170.24) translate(308.65 63.64) matrix(-1 0 0 1 174.94 -3.472)"
        ></path>
        <path
          d="M5.029 384.15s-3.483 26.011 81.317 26.011 82.708-26.011 82.708-26.011"
          transform="translate(-308.66 -170.24) translate(308.65 63.64)"
        ></path>
      </g>
      <path
        d="M328.72 250.15c-.072.14 32.963 18.738 67.965 18.208 35.002-.53 66.465-19.269 66.465-19.269.7 0-17.933 19.436-54.676 43.767-13.466 21.621-11.112 45.199-12.496 45.328-1.384.13 1.382-25.682-13.203-46.846-36.575-24.856-53.983-41.329-54.055-41.189zM328.72 445.12c2.757 1.98 32.963 9.9 67.965 10.43 35.002.53 64.347-6.364 66.465-9.37 2.118-3.004-27.422-24.552-44.565-29.17-13.405-3.611-21.619-19.903-24.021-19.903-2.402 0-13.408 16.236-26.496 19.42-15.753 3.835-42.105 26.613-39.348 28.594z"
        transform="translate(-308.66 -170.24)"
      ></path>
    </svg>
  );
}

function Home() {
  const navigator = useNavigate();

  function handleClick() {
    navigator("/signup");
  }

  return (
    <>
    <div className="home-container">
      <SpringFade>
        <div className="home-content">
          <h2 className="home-title"> Explore Historical Battles & Events</h2>
          <h4 className="home-subtitle">
            An interactive journey through history
          </h4>
          <button onClick={handleClick} className="home-btn">
            Thirty Years' War (1618-1648)
          </button>
        </div>
      </SpringFade>

      <SpringFade>
        <div className="home-icon">
          <Icon />
        </div>
      </SpringFade>
    </div>
    <Footer/>
    </>
    
  );
}

export default Home;
