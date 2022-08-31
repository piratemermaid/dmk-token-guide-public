import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

import { useCharacterNames } from "../../../../hooks/appData";

const CharacterInput = ({ name, label, onChange }) => {
    const [selected, setSelected] = useState("");
    const [options, setOptions] = useState([]);

    const characterNames = useCharacterNames();

    useEffect(() => {
        if (characterNames) {
            setOptions(
                characterNames.map((name) => {
                    return { value: name, label: name };
                })
            );
        }
    }, [characterNames]);

    return (
        <Autocomplete
            id={name}
            inputValue={selected}
            onInputChange={(e, newValue) => {
                setSelected(newValue);
                onChange(newValue);
            }}
            options={options}
            renderInput={(params) => (
                <TextField {...params} label={label} variant="standard" />
            )}
        />
    );
};

CharacterInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CharacterInput;
