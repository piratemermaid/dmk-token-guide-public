import React from "react";
import { Link } from "react-router-dom";

import CharacterImg from "../components/images/CharacterImg";

const NotFound = () => (
    <div className="container">
        <div className="center">
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
            <p>...Nope! This page doesn't exist.</p>
            <p>
                <Link to="/">Make Way To Home Page</Link>
            </p>
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
            <CharacterImg name="Gramma Tala" imgClass="error-page" />
        </div>
    </div>
);

export default NotFound;
