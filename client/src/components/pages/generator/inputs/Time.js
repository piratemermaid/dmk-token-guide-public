import { useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

const TimeInput = ({ name, label, onChange }) => {
    const [selected, setSelected] = useState("");

    const times = ["1h", "2h", "4h", "6h", "8h", "12h", "24h"];
    const options = times.map((time) => {
        return {
            value: time,
            label: time
        };
    });

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

TimeInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default TimeInput;
