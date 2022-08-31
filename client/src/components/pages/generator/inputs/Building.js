import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

import { useBuildingNames } from "../../../../hooks/appData";

const BuildingInput = ({ name, label, onChange }) => {
    const [selected, setSelected] = useState("");
    const [options, setOptions] = useState([]);

    const buildingNames = useBuildingNames();

    useEffect(() => {
        if (buildingNames) {
            setOptions(
                buildingNames.map((name) => {
                    return { value: name, label: name };
                })
            );
        }
    }, [buildingNames]);

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

BuildingInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default BuildingInput;
