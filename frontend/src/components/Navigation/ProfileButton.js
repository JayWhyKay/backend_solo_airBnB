import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(() => history.push("/"))
  };

  return (
    <>
      <button className="profile__button" onClick={openMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hamburger"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="profile__icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {showMenu && (
        <div className="profile__dropdown">
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div className="profile__email">{user.email}</div>
          <div className="profile__listings" onClick={()=>history.push(`/user/my-listings`)}>
            <button className="profile__link">
                My Listings
            </button>
          </div>
          <div className="profile__listings" onClick={() => history.push(`/user/my-reviews`)}>
            <button className="profile__link">
                My Reviews
            </button>
          </div>
          <div>
            <button className="log__out__button" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
