import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutBtn";
import "./Header.css";
import requireAuth from "components/requireAuth";
import { CURRENT_USER } from "graphQL/queries";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "images/idea.svg";

export default requireAuth(function Header() {
  const history = useHistory();
  const { data, error } = useQuery(CURRENT_USER);
  if (error && error.toString().indexOf("Not Authenticated") > -1) {
    localStorage.clear();
    window.location.reload();
    history.push("/");
  }
  const name = data && data.currentUser.name;
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          <span className="nav__title">Concept Live</span>
          <Logo className="brand-logo__img" />
        </Link>
        <ul className="right nav__right-menu">
          <LogoutButton />
          <span>hello {name}</span>
        </ul>
      </div>
    </nav>
  );
});
