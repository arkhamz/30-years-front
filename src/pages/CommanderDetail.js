import { useDispatch, useSelector } from "react-redux";
import { selectOneCommander } from "../store/commander/commanderSelectors";
import { fetchOneCommander } from "../store/commander/commanderThunks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./CommanderDetail.css";
import { clearCommanderDetail } from "../store/commander/commanderSlice";
import { Fade } from "react-awesome-reveal";

function CommanderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const commander = useSelector(selectOneCommander);

  console.log(commander);

  useEffect(function () {
    //dispatch thunk action that gets commander from db
    dispatch(fetchOneCommander(id));

    //BUG FIX
    //if you go back to commanders page and then click new commander
    //you see current commander briefly before the redux state is replaced with new one
    //this should clear it when you leave the page;
    return function () {
      dispatch(clearCommanderDetail());
    };
  }, []);

  // "bio birthDate birthPlace died fullName id imageUrl loyalty loyaltyImageUrl title"

  return (
    <>
      {commander && (
        <div className="commander-detail-container">
          
            <div className="commander-details">
             <Fade>
             <h2>Title: {commander.title}</h2>
              <h2> Birth Date: {commander.birthDate}</h2>
              <h2>Birth Place: {commander.birthPlace}</h2>
              <h2>Allegiance: {commander.loyalty}</h2>
              <h2>Died on: {commander.died}</h2>
             </Fade>
            </div>

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
              <Fade>
              <p>{commander.bio}</p>
              </Fade>
            </div>
          
        </div>
      )}
    </>
  );
}

export default CommanderDetail;
