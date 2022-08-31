export const taskGeneratedText = ({ type, values }) => {
    function getStrFromValues() {
        switch (type) {
            default:
                let task = {
                    name: values.name,
                    characters: getCharsArray(values),
                    time: values.time
                };
                if (values.buildingReqName || values.costumeReq1Name) {
                    task.required = getReqArr(values);
                }
                task.tokens = getTokensArr(values.tokens);

                return JSON.stringify(task, null, 2);
        }
    }

    return getStrFromValues();
};

export function prettyPrintArray(json) {
    if (typeof json === "string") {
        json = JSON.parse(json);
    }
    const output = JSON.stringify(
        json,
        function (k, v) {
            if (v instanceof Array) return JSON.stringify(v);
            return v;
        },
        2
    )
        .replace(/\\/g, "")
        .replace(/\"\[/g, "[")
        .replace(/\]\"/g, "]")
        .replace(/\"\{/g, "{")
        .replace(/\}\"/g, "}");

    return output;
}

function getCharsArray(values) {
    const { char1Name, char1Level, char2Name, char2Level } = values;
    if (!char2Name) {
        return [{ name: char1Name, level: parseInt(char1Level) || 1 }];
    } else {
        return [
            { name: char1Name, level: parseInt(char1Level) || 1 },
            { name: char2Name, level: parseInt(char2Level) || 1 }
        ];
    }
}

function getReqArr(values) {
    const {
        buildingReqName,
        buildingReqLevel,
        costumeReq1Name,
        costumeReq1Char,
        costumeReq2Name,
        costumeReq2Char
    } = values;

    let arr = [];

    if (buildingReqName) {
        if (!buildingReqLevel) {
            arr.push({ name: buildingReqName, type: "building" });
        } else {
            arr.push({
                name: buildingReqName,
                level: parseInt(buildingReqLevel),
                type: "building"
            });
        }
    }

    if (costumeReq1Name && costumeReq1Char) {
        arr.push({ name: costumeReq1Name, character: costumeReq1Char });
    }
    if (costumeReq2Name && costumeReq2Char) {
        arr.push({ name: costumeReq2Name, character: costumeReq2Char });
    }

    return arr;
}

function getTokensArr(tokens) {
    const formatted = tokens.map(({ value }) => {
        if (value.name && value.type) {
            return { name: value.name, tokenType: value.type };
        } else {
            return null;
        }
    });
    return formatted.filter((item) => item);
}
