import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

import { useSpecialTokens } from "../../../../hooks/appData";

const SpecialTokenInput = ({ name, label, onChange }) => {
    const [selected, setSelected] = useState("");
    const [options, setOptions] = useState([]);

    const tokens = useSpecialTokens();

    useEffect(() => {
        if (tokens) {
            setOptions(
                tokens.map((name) => {
                    return { value: name, label: name };
                })
            );
        }
    }, [tokens]);

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

SpecialTokenInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SpecialTokenInput;
