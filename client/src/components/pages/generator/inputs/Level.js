import { useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

const LevelInput = ({ type, name, label, onChange }) => {
    const [selected, setSelected] = useState("");

    const maxNum = type === "character" ? 10 : 5;

    let options = [];
    if (type === "building") {
        options.push({ value: null, label: "None" });
    }

    for (let i = 1; i <= maxNum; i++) {
        options.push({ value: i, label: i.toString() });
    }

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

LevelInput.propTypes = {
    type: PropTypes.string.isRequired, // character or building
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LevelInput;
