import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles({
    warning: { textAlign: "center", padding: "10px 0" }
});

const SiteWarning = () => {
    const classes = useStyles();

    return (
        <Box className={`${classes.warning} orange darken-1}`}>
            WARNING: The backend is down, which means nothing is working. I am
            working on it.
        </Box>
    );
};

export default SiteWarning;
