import { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Autocomplete, TextField } from "@mui/material";

import { CharacterInput, GroupInput, SpecialTokenInput } from "./";

const TokenInput = ({ name, label, onChange }) => {
    const [selectedType, setSelectedType] = useState("token");
    const [selectedTokenName, setSelectedTokenName] = useState("");

    const types = ["token", "ears", "collection", "special"];

    const handleChange = (isType, newValue) => {
        const updatedValues = isType
            ? { name: selectedTokenName, type: newValue }
            : { name: newValue, type: selectedType };
        onChange(updatedValues);
    };

    return (
        <Grid container>
            <Grid item xs={4}>
                <Autocomplete
                    id={name}
                    inputValue={selectedType}
                    onInputChange={(e, newValue) => {
                        setSelectedType(newValue);
                        handleChange(true, newValue);
                    }}
                    options={types.map((type) => {
                        return { label: type, value: type };
                    })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant="standard"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={8}>
                <DropdownOfType
                    type={selectedType}
                    setSelectedTokenName={setSelectedTokenName}
                    handleChange={handleChange}
                />
            </Grid>
        </Grid>
    );
};

const DropdownOfType = ({ type, setSelectedTokenName, handleChange }) => {
    switch (type) {
        case "collection":
            return (
                <GroupInput
                    name="group"
                    label="Group"
                    onChange={(newValue) => {
                        setSelectedTokenName(newValue);
                        handleChange(false, newValue);
                    }}
                />
            );
        case "special":
            return (
                <SpecialTokenInput
                    name="specialtoken"
                    label="Special Token"
                    onChange={(newValue) => {
                        setSelectedTokenName(newValue);
                        handleChange(false, newValue);
                    }}
                />
            );
        default:
            return (
                <CharacterInput
                    name="char"
                    label="Char"
                    onChange={(newValue) => {
                        setSelectedTokenName(newValue);
                        handleChange(false, newValue);
                    }}
                />
            );
    }
};

TokenInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default TokenInput;
