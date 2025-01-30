import "./closeFriend.css";

import React from "react";

export default function CloseFriend({ friend }) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={friend?.profilePicture} alt="" />
      <span className="sidebarFriendName">{friend.username}</span>
    </li>
  );
}
