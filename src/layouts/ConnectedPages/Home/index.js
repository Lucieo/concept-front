import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER } from "graphQL/queries";
import "./Home.css";
import Loading from "components/Loading";
import CreateGame from "components/GameControls/CreateGame";
import { Link } from "react-router-dom";
import requireAuth from "components/requireAuth";
import Frame from "images/frame.svg";
import GameStatus from "components/GameStatus";

function Home() {
  const { data, loading } = useQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;

  const user = data && data.currentUser;
  console.log(user);

  return (
    <div className="center connected-home container">
      <div
        className="connected-home__avatar"
        style={{ background: `url(${Frame})` }}
      >
        <img
          src={`../images/players/${user.icon}.png`}
          alt="avatar"
          style={{ width: 100 }}
        />
      </div>
      <h5>Bienvenue</h5>
      <h4>{user.name}</h4>
      <div className="row connected-home__flex">
        <div className="col m6 s12">
          <div className="connected-home__box">
            <h6 className="bold">MATE TES STATS</h6>
            <p>Score total : {user.totalPoints} points</p>
            <p>Nombre de parties jouées : {user.totalGames}</p>
            <GameStatus user={user} />
          </div>
        </div>
        <div className="col m6 s12">
          <div className="connected-home__box">
            <p className="bold">Profil</p>
            <Link to="/profile" className="btn">
              Modifier Mon profil
            </Link>
            <p className="bold">Envie de jouer?</p>
            <CreateGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default requireAuth(Home);
