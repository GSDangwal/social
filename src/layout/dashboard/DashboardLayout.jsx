import React from "react";
import "./dashboardLayout.css";
import Sidebar from "../../component/sidebar/Sidebar";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Topbar from "../../component/topbar/Topbar";
import Rightbar from "../../component/rightbar/Rightbar";

export const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <div className="main_container">
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            // width: { sm: `calc(100% - ${270}px)` },
          }}
        >
          <Outlet />
        </Box>
        <Rightbar />
      </div>
    </>
  );
};
