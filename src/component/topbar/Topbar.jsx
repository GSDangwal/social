import React from "react";
import "./topbar.css";
// import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";

export default function Topbar() {
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/profile");
  };

  const navigateHome = () => {
    navigate("/home");
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social</span>
      </div>
      <div className="topbarCenter">
        <div className="searchBar" style={{ alignItems: "center" }}>
          {/* <Search className="searchIcon" /> */}
          <SearchIcon className="search" style={{ marginLeft: 20 }} />
          <input placeholder="Search For Video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={navigateHome}>
            HomePage
          </span>
          <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadage">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadage">2</span>
          </div>

          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadage">3</span>
          </div>
        </div>

        <img
          src="./assets/person(1).jpg"
          alt=""
          className="topbarImage"
          onClick={navigateProfile}
        />
      </div>
    </div>
  );
}
