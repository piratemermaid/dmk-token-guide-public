import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

import { useCharacterGroups } from "../../../../hooks/appData";

const GroupInput = ({ name, label, onChange }) => {
    const [selected, setSelected] = useState("");
    const [options, setOptions] = useState([]);

    const groups = useCharacterGroups();

    useEffect(() => {
        if (groups) {
            setOptions(
                groups.map((name) => {
                    return { value: name, label: name };
                })
            );
        }
    }, [groups]);

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

GroupInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default GroupInput;
