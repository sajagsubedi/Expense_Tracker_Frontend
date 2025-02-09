import { Routes, Route, Navigate } from "react-router-dom";
import { GET_AUTHUSER } from "./graphql/index.jsx";
import { useQuery } from "@apollo/client";

import {
  HomePage,
  NotFoundPage,
  SigninPage,
  SignupPage,
} from "./pages/index.jsx";

export default function App() {
  const { loading, data } = useQuery(GET_AUTHUSER);
  if (loading) return null;

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          data?.authUser ? (
            <HomePage authUser={{ loading, data }} />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        exact
        path="/signup"
        element={!data?.authUser ? <SignupPage /> : <Navigate to="/" />}
      />
      <Route
        exact
        path="/signin"
        element={!data?.authUser ? <SigninPage /> : <Navigate to="/" />}
      />
      <Route exact path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
