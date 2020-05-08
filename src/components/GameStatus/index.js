import React from "react";
import { ReactComponent as Hat } from "images/hat.svg";
import { ReactComponent as Brain } from "images/brain.svg";
import { ReactComponent as Knight } from "images/knight.svg";
import { ReactComponent as King } from "images/crown.svg";
import { ReactComponent as Carnival } from "images/carnival.svg";
import { ReactComponent as God } from "images/god.svg";
import "./GameStatus.css";

export default function GameStatus({ user }) {
  const selectGrad = (user) => {
    const level = user.totalGames;
    if (level < 5) {
      return (
        <>
          <p>Doux rêveur</p>
          <Hat className="gamestatus__svg" />
        </>
      );
    } else if (level < 10) {
      return (
        <>
          <p>Saltimbanque poétique</p>
          <Carnival className="gamestatus__svg" />
        </>
      );
    } else if (level < 15) {
      return (
        <>
          <p>Chevalier philosophe</p>
          <Knight className="gamestatus__svg" />
        </>
      );
    } else if (level < 20) {
      return (
        <>
          <p>Roi de la métaphore</p>
          <King className="gamestatus__svg" />
        </>
      );
    } else if (level < 25) {
      return (
        <>
          <p>Prophète Onirique</p>
          <Brain className="gamestatus__svg" />
        </>
      );
    } else if (level >= 25) {
      return (
        <>
          <p>Dieu de l'implicite</p>
          <God className="gamestatus__svg" />
        </>
      );
    }
  };
  return (
    <div className="gamestatus__wrapper">
      <p>GRADE</p>
      {selectGrad(user)}
    </div>
  );
}
