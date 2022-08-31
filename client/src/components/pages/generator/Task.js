import { useState } from "react";
import { Grid } from "@mui/material";
import InputField from "../../Form/InputField";

import GeneratorPage from "./GeneratorPage";
import { taskGeneratedText, prettyPrintArray } from "./textGenerator";
import {
    CharacterInput,
    BuildingInput,
    LevelInput,
    TimeInput,
    CostumeReqInput,
    TokenInput
} from "./inputs";

const initialValues = {
    name: "",
    char1Name: "",
    char1Level: "",
    char2Name: "",
    char2Level: "",
    time: "",
    buildingReqName: "",
    buildingReqLevel: "0",
    costumeReq1Name: "",
    costumeReq1Char: "",
    costumeReq2Name: "",
    costumeReq2Char: "",
    tokens: []
};

const GeneratorTask = () => {
    const [values, setValues] = useState(initialValues);

    const text = taskGeneratedText({
        values,
        type: "task"
    });

    const handleChange = (e, name) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const updateValue = (name, newValue) => {
        setValues({ ...values, [name]: newValue });
    };

    const addToken = (e) => {
        e.preventDefault();
        const tokenIndex = values.tokens.length;

        setValues({
            ...values,
            tokens: [
                ...values.tokens,
                {
                    name: `token-${tokenIndex}`,
                    label: `Token ${tokenIndex}`,
                    value: { name: "", type: "" }
                }
            ]
        });
    };

    const updateTokenValue = (index, newValue) => {
        let newTokens = [...values.tokens];
        newTokens[index] = { ...newTokens[index], value: newValue };
        setValues({
            ...values,
            tokens: newTokens
        });
    };

    return (
        <GeneratorPage title="Task">
            <form id="form">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <InputField
                            type="text"
                            label={inputs.name.label}
                            value={values[inputs.name.name]}
                            onChange={(e) => handleChange(e, inputs.name.name)}
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <CharacterInput
                                    name={inputs.char1Name.name}
                                    label={inputs.char1Name.label}
                                    onChange={(newValue) => {
                                        updateValue(
                                            inputs.char1Name.name,
                                            newValue
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LevelInput
                                    type="character"
                                    name={inputs.char1Level.name}
                                    label={inputs.char1Level.label}
                                    onChange={(newValue) =>
                                        updateValue(
                                            inputs.char1Level.name,
                                            newValue
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <CharacterInput
                                    name={inputs.char2Name.name}
                                    label={inputs.char2Name.label}
                                    onChange={(newValue) => {
                                        updateValue(
                                            inputs.char2Name.name,
                                            newValue
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LevelInput
                                    type="character"
                                    name={inputs.char2Level.name}
                                    label={inputs.char2Level.label}
                                    onChange={(newValue) =>
                                        updateValue(
                                            inputs.char2Level.name,
                                            newValue
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                        <TimeInput
                            name={inputs.time.name}
                            label={inputs.time.label}
                            onChange={(newValue) =>
                                updateValue(inputs.time.name, newValue)
                            }
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <BuildingInput
                                    name={inputs.buildingReqName.name}
                                    label={inputs.buildingReqName.label}
                                    onChange={(newValue) => {
                                        updateValue(
                                            inputs.buildingReqName.name,
                                            newValue
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LevelInput
                                    type="building"
                                    name={inputs.buildingReqLevel.name}
                                    label={inputs.buildingReqLevel.label}
                                    onChange={(newValue) =>
                                        updateValue(
                                            inputs.buildingReqLevel.name,
                                            newValue
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                        <CostumeReqInput
                            char={{
                                name: inputs.costumeReq1Char.name,
                                label: inputs.costumeReq1Char.label,
                                onChange: (newValue) =>
                                    updateValue(
                                        inputs.costumeReq1Char.name,
                                        newValue
                                    )
                            }}
                            costume={{
                                name: inputs.costumeReq1Name.name,
                                label: inputs.costumeReq1Name.label,
                                onChange: (newValue) =>
                                    updateValue(
                                        inputs.costumeReq1Name.name,
                                        newValue
                                    )
                            }}
                        />
                        <CostumeReqInput
                            char={{
                                name: inputs.costumeReq2Char.name,
                                label: inputs.costumeReq2Char.label,
                                onChange: (newValue) =>
                                    updateValue(
                                        inputs.costumeReq2Char.name,
                                        newValue
                                    )
                            }}
                            costume={{
                                name: inputs.costumeReq2Name.name,
                                label: inputs.costumeReq2Name.label,
                                onChange: (newValue) =>
                                    updateValue(
                                        inputs.costumeReq2Name.name,
                                        newValue
                                    )
                            }}
                        />
                        <button className="btn" onClick={addToken}>
                            + Token
                        </button>
                        {values.tokens.map(({ name, label }, index) => (
                            <TokenInput
                                key={name}
                                name={name}
                                label={label}
                                onChange={(newValue) => {
                                    updateTokenValue(index, newValue);
                                }}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <button
                            className="btn"
                            onClick={(e) =>
                                copyToClipboard(e, `${prettyPrintArray(text)},`)
                            }
                        >
                            Copy
                        </button>
                        <textarea
                            style={{ height: "500px" }}
                            value={text}
                            onChange={() => {}}
                        />
                    </Grid>
                </Grid>
            </form>
        </GeneratorPage>
    );
};

const copyToClipboard = (e, str) => {
    e.preventDefault();
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject("The Clipboard API is not available.");
};

const inputs = {
    name: { name: "name", label: "Name" },
    char1Name: { name: "char1Name", label: "Character 1 Name" },
    char1Level: { name: "char1Level", label: "Character 1 Level" },
    char2Name: { name: "char2Name", label: "Character 2 Name" },
    char2Level: { name: "char2Level", label: "Character 2 Level" },
    time: { name: "time", label: "Time" },
    buildingReqName: { name: "buildingReqName", label: "Building Req Name" },
    buildingReqLevel: { name: "buildingReqLevel", label: "Building Req Level" },
    costumeReq1Name: { name: "costumeReq1Name", label: "costumeReq1Name" },
    costumeReq1Char: { name: "costumeReq1Char", label: "costumeReq1Char" },
    costumeReq2Name: { name: "costumeReq2Name", label: "costumeReq2Name" },
    costumeReq2Char: { name: "costumeReq2Char", label: "costumeReq2Char" },
    tokens: { name: "tokens", label: "Tokens" }
};

export default GeneratorTask;
