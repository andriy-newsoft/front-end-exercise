import React from "react";
import { useAppSelector } from "./store/hooks";
import { selectIsAuth } from "./store/modules/user/selectors";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./view/pages/Auth/Login";
import Home from "./view/pages/Home";
const RootRouter = () => {
  const isAuth = useAppSelector(selectIsAuth);
  return isAuth ? (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default RootRouter;
