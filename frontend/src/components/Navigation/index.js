import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="header">
      <div className="logo__container">
      <i className="fa-solid fa-otter fa-2x"></i>
        <Link className="home__link" exact to="/">
          Mybnb
        </Link>
      </div>

      <div className="search__container">
        <button>Anywhere</button>
        <button>Any Week</button>
        <button>Add Guest</button>
        <div className="search__glass">
          <i className="fa-solid fa-magnifying-glass fa-inverse fa-xs"></i>
        </div>
      </div>

      <div className="profile__container">
        <p>Become a host</p>
        <i className="fa-solid fa-globe"></i>
        <div>{sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
