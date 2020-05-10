import React from "react";
import { ReactComponent as Level1 } from "images/level1.svg";
import { ReactComponent as Level2 } from "images/level2.svg";
import { ReactComponent as Level3 } from "images/level3.svg";
import { ReactComponent as Level4 } from "images/level3.svg";

import "./GameStatus.css";

export default function GameStatus({ user }) {
  const selectGrad = (user) => {
    const level = user.totalGames;
    if (level < 5) {
      return (
        <>
          <p>Conceptochou</p>
          <Level1 className="gamestatus__svg" />
        </>
      );
    } else if (level < 10) {
      return (
        <>
          <p>Conceptino </p>
          <Level2 className="gamestatus__svg" />
        </>
      );
    } else if (level < 20) {
      return (
        <>
          <p>Conceptosaure</p>
          <Level3 className="gamestatus__svg" />
        </>
      );
    } else if (level >= 20) {
      return (
        <>
          <p>MegaloConceptodon</p>
          <Level4 className="gamestatus__svg" />
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
