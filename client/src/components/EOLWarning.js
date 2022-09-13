import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles({
    warning: { textAlign: "center", padding: "10px 0" }
});

const EOLWarning = () => {
    const classes = useStyles();

    return (
        <Box className={`${classes.warning} orange darken-1}`}>
            Please see this notice on DMK Token Guide EOL.
        </Box>
    );
};

export default EOLWarning;
