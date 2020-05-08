import React from "react";

const styles = {
  big: {
    width: 100,
    margin: 5,
  },
  small: {
    width: 30,
    margin: 5,
  },
  regularStyle: {
    width: 60,
    border: "2px solid lightgray",
    padding: 10,
    borderRadius: "50%",
  },
};

export default function PlayerCardIcon({
  player,
  size = "regular",
  points = undefined,
}) {
  return (
    <span>
      <img
        style={size === "regular" ? styles.regularStyle : styles[size]}
        src={`../images/players/${player.icon}.png`}
      />
      {points !== undefined && (
        <span>
          {player.name} : {points}
        </span>
      )}
    </span>
  );
}
