import React from "react";
import { useSelector } from "react-redux";
import CharacterImg from "../../images/CharacterImg";

const CostumePageAnchor = ({ name }) => {
    const { workMode } = useSelector((state) => {
        return state.appState;
    });

    if (!workMode) {
        return <CharacterImg name={name} imgClass="char-img" />;
    } else {
        return <span className="building-sort">{name}</span>;
    }
};

export default CostumePageAnchor;
