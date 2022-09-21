import { useDispatch, useSelector } from "react-redux";
import { selectOneCommander } from "../store/commander/commanderSelectors";
import { fetchOneCommander } from "../store/commander/commanderThunks";
import { useEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import "./CommanderDetail.css";
import { clearCommanderDetail } from "../store/commander/commanderSlice";
// import { Fade } from "react-awesome-reveal";
import SpringFade from "../components/Fade";

function CommanderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const commander = useSelector(selectOneCommander);


  console.log(commander);

  useEffect(function () {
    //dispatch thunk action that gets commander from db
    dispatch(fetchOneCommander(id));

    //clear commander from redux state when we leave the page s
    return function () {
      dispatch(clearCommanderDetail());
    };
  }, []);

  // "bio birthDate birthPlace died fullName id imageUrl loyalty loyaltyImageUrl title"

  return (
    <>
      {commander && (
        <div className="commander-detail-container">
          
           <SpringFade>
           <div className="commander-details">
             <h2>Title: {commander.title}</h2>
              <h2> Birth Date: {commander.birthDate}</h2>
              <h2>Birth Place: {commander.birthPlace}</h2>
              <h2>Allegiance: {commander.loyalty}</h2>
              <h2>Died on: {commander.died}</h2>
            </div>
           </SpringFade>

            <div className="commander-pic-title">
              <h1 className="commander-header">{commander.fullName}</h1>
              <img
                loading="lazy"
                className="commander-portrait"
                src={commander.imageUrl}
                alt=""
              />
              <img
                className="flag-small"
                src={commander.loyaltyImageUrl}
                alt=""
              />
            </div>

            <div className="commander-bio">
              <SpringFade>
              <p>{commander.bio}</p>
              </SpringFade>
            </div>
          
        </div>
      )}
    </>
  );
}

export default CommanderDetail;
