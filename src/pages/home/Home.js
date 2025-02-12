import React from "react";
import "./home.css";
import Feed from "../../component/feed/Feed";

export default function Home() {
  return (
    <>
      {/* <Topbar /> */}
      <div>
        {/* <Sidebar /> */}
        <Feed />
        {/* <Rightbar /> */}
      </div>
    </>
  );
}
