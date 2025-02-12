import { Route, Routes } from "react-router";

import React, { lazy, Suspense } from "react";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Sidebar from "../component/sidebar/Sidebar";
import { DashboardLayout } from "../layout/dashboard/DashboardLayout";
import { AuthLayout } from "../layout/auth/AuthLayout";

const ProfileMenu = lazy(() => import("../pages/profile/Profile"));
export const AppRoutes = () => {
  return (
    <Routes>
      {/* routes for auth page which does not have header, sidebar */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      {/* routes for login user */}
      <Route element={<DashboardLayout />}>
        <Route path="/home" element={<Home />} />
        {/* <Route
          path="/profile"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <ProfileMenu />
            </Suspense>
          }
        /> */}
      </Route>
      <Route
        path="/profile"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <ProfileMenu />
          </Suspense>
        }
      />
    </Routes>
  );
};
