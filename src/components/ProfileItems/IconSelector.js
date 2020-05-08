import React from "react";
import "./ProfileItems.css";

const availableIcons = Array(28)
  .fill("player")
  .map((el, idx) => el + (idx + 1));

export default function IconSelector({ selectedIcon, setIcon }) {
  console.log();
  return (
    <div className="icon-selector">
      {availableIcons.map((icon, index) => (
        <div
          key={index}
          className={`material-icons small player-icon ${
            selectedIcon === icon && "selected-icon"
          }`}
          onClick={() => {
            setIcon(icon);
          }}
        >
          <img src={`../images/players/${icon}.png`} alt="player icon" />
        </div>
      ))}
    </div>
  );
}
