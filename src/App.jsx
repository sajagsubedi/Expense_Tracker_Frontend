import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import { GET_AUTHUSER } from "./graphql/index.jsx";
import { useQuery } from "@apollo/client";

import {
  HomePage,
  NotFoundPage,
  SigninPage,
  SignupPage,
  TransactionPage,
} from "./pages/index.jsx";

export default function App() {
  const { loading, data } = useQuery(GET_AUTHUSER);
  if (loading) return null;

  return (
    <Routes>
      <Route exact path="/" element={data?.authUser?<HomePage />:<Navigate to="/"/>} />
      <Route exact path="/signup" element={!data?.authUser?<SignupPage />:<Navigate to="/signin"/>} />
      <Route exact path="/signin" element={!data?.authUser?<SigninPage />:<Navigate to="/"/>} />
      <Route exact path="/transaction/:id" element={<TransactionPage />} />
      <Route exact path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
