import _ from "lodash";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Autocomplete, TextField } from "@mui/material";

import { useCostumes } from "../../../../hooks/appData";

const CostumeReqInput = ({ char, costume }) => {
    const [selectedChar, setSelectedChar] = useState("");
    const [selectedCostume, setSelectedCostume] = useState("");
    const [charOptions, setCharOptions] = useState([]);
    const [filteredCharOptions, setFilteredCharOptions] = useState([]);
    const [costumeOptions, setCostumeOptions] = useState([]);
    const [filteredCostumeOptions, setFilteredCostumeOptions] = useState([]);

    const costumeList = useCostumes();

    useEffect(() => {
        if (costumeList) {
            setCharOptions(
                _.uniqBy(
                    costumeList.map(({ character }) => {
                        return { value: character, label: character };
                    }),
                    "value"
                )
            );
            setCostumeOptions(
                _.uniqBy(
                    costumeList.map(({ name }) => {
                        return { value: name, label: name };
                    }),
                    "value"
                )
            );
        }
    }, [costumeList]);

    useEffect(() => {
        if (costumeList && selectedCostume) {
            const costumeChars = costumeList.filter(
                (costume) => costume.name === selectedCostume
            );
            setFilteredCharOptions(
                costumeChars.map(({ character }) => character)
            );
        }
    }, [selectedCostume]);

    useEffect(() => {
        if (costumeList && selectedChar) {
            const charCostumes = costumeList.filter(
                (costume) => costume.character === selectedChar
            );
            setFilteredCostumeOptions(charCostumes.map(({ name }) => name));
        }
    }, [selectedChar]);

    return (
        <Grid container>
            <Grid item xs={6}>
                <Autocomplete
                    id={char.name}
                    inputValue={selectedChar}
                    onInputChange={(e, newValue) => {
                        setSelectedChar(newValue);
                        char.onChange(newValue);
                    }}
                    options={
                        selectedCostume ? filteredCharOptions : charOptions
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={char.label}
                            variant="standard"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={6}>
                <Autocomplete
                    id={costume.name}
                    inputValue={selectedCostume}
                    onInputChange={(e, newValue) => {
                        setSelectedCostume(newValue);
                        costume.onChange(newValue);
                    }}
                    options={
                        selectedChar ? filteredCostumeOptions : costumeOptions
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={costume.label}
                            variant="standard"
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

CostumeReqInput.propTypes = {
    char: PropTypes.object.isRequired,
    costume: PropTypes.object.isRequired
};

export default CostumeReqInput;
