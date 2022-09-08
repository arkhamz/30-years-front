import { useEffect } from "react";
import React from "react"

import { useDispatch, useSelector } from "react-redux";
import "./Commanders.css"
import { fetchCommanders } from "../store/commander/commanderThunks";
import { selectCommanders } from "../store/commander/commanderSelectors";
import CommanderCard from "../components/CommanderCard";
import Carousel from "@itseasy21/react-elastic-carousel"

function Commanders() {
  const dispatch = useDispatch();
  const commanders = useSelector(selectCommanders);

  useEffect(
    function () {
      //dispatch thunk that fetches commanders
      dispatch(fetchCommanders());
    },
    [dispatch]
  );
    //code for responsive carousel
  const breakPoints = [
    {width:1, itemsToShow:1},
    {width:550, itemsToShow:2},
    {width:768, itemsToShow:3},
    {width:1200, itemsToShow:4}
  ]


  return (
    <div className="commanders-container">
      <h1 className="commanders-header">Key Commanders & Leaders</h1>
      {commanders && (
        <Carousel breakPoints={breakPoints}>
          {commanders.map(function (item, index, arr) {
          return <CommanderCard commander={item} key={item.id}/>
        })}
        </Carousel>
      )}
    </div>
  );

  
}

export default Commanders;

