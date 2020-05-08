import React, { useState } from "react";
import requireAuth from "../../../components/requireAuth";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CURRENT_USER } from "../../../graphQL/queries";
import { MODIFY_USER } from "../../../graphQL/mutations";
import IconSelector from "../../../components/ProfileItems/IconSelector";
import "./Profil.css";
import { useHistory } from "react-router-dom";

const Profil = () => {
  const [icon, setIcon] = useState("tag_faces");
  const [name, setName] = useState("");
  let history = useHistory();

  const { loading } = useQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      setName(data.currentUser.name);
      setIcon(data.currentUser.icon || "monster1");
    },
  });

  const [modifyUser] = useMutation(MODIFY_USER, {
    variables: { name, icon },
    onCompleted(response) {
      history.push("/");
    },
    refetchQueries: [
      {
        query: CURRENT_USER,
      },
    ],
  });

  if (loading) return <></>;

  return (
    <div className="container profile">
      <div className="row">
        <div className="col s6 center">
          <img
            src={`../images/players/${icon}.png`}
            alt="avatar"
            style={{ width: 100 }}
          />
        </div>
        <div className="col s6">
          <h4>Mon Profil</h4>
          <input
            placeholder="nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />
        </div>
        <div>
          <p>Mon avatar</p>
          <IconSelector setIcon={setIcon} selectedIcon={icon} />
        </div>
        <div className="center profil__save-btn">
          <button className="btn" onClick={() => modifyUser()}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default requireAuth(Profil);
