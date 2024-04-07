import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    HomePage,
    NotFoundPage,
    SigninPage,
    SignupPage,
    TransactionPage
} from "./pages/index.jsx";

export default function App() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route exact path="/signin" element={<SigninPage />} />
            <Route
                exact
                path="/transaction/:id"
                element={<TransactionPage />}
            />
            <Route exact path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
