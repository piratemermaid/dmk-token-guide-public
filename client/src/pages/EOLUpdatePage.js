import { useState } from "react";
import { useSelector } from "react-redux";

const EOLUpdatePage = () => {
    const [showCopied, setShowCopied] = useState(false);

    const { userData } = useSelector((state) => state);
    const { characters, buildings, costumes, concessions, floats } = userData;

    const getDataExportText = () => {
        const dataExport = {
            characters,
            buildings,
            costumes,
            concessions,
            floats
        };

        return JSON.stringify(dataExport);
    };

    const copyDataExportToClipboard = () => {
        const text = getDataExportText();
        navigator.clipboard.writeText(text);
        showCopiedText();
    };

    const showCopiedText = () => {
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, [2000]);
    };

    return (
        <div style={{ margin: "20px 40px" }}>
            <p>
                I'm pushing back the EOL to mid-November because I have not been
                able to set things up how I want (got sick, family visited, got
                sick again lol). A lot of developers have been interested in
                taking over so this will not be the end of DMKTG! I will try to
                pick the best successor.
            </p>
            <p>
                I wanted to give everyone the opportunity to save their data
                before I stop the server, so copy your data from here and save
                it somewhere:
            </p>

            <div className="row">
                <button
                    className="btn deep-purple lighten-2"
                    onClick={copyDataExportToClipboard}
                >
                    Copy Data
                </button>
                {showCopied && (
                    <span style={{ marginLeft: "10px", color: "#9575cd" }}>
                        Copied!
                    </span>
                )}
            </div>
            {userData.status === "success" ? (
                <textarea
                    defaultValue={getDataExportText()}
                    style={{ height: "200px" }}
                />
            ) : (
                "loading..."
            )}
        </div>
    );
};

export default EOLUpdatePage;
