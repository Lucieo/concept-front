import React from "react";
import CardBg from "images/mysteryCard.jpg";

const styles = {
  card: {
    height: 300,
    width: 200,
    border: "1px solid lightgray",
    borderRadius: 5,
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginBottom: 30,
    background: `url(${CardBg})`,
    backgroundSize: "cover",
    maxWidth: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontSize: "15rem",
  },
};
export default function MysteryCard() {
  return (
    <>
      <p className="center">Choisissez une carte</p>
      <div style={styles.card}>?</div>
    </>
  );
}
