import { Route, Routes } from "react-router";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { lazy, Suspense } from "react";

const ProfileMenu = lazy(() => import("./pages/profile/Profile"));
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/profile"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <ProfileMenu />{" "}
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
