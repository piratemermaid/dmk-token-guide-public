import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "./Router/routes";

const useStyles = makeStyles({
    warning: { textAlign: "center", padding: "10px 0" }
});

const EOLWarning = () => {
    const classes = useStyles();

    return (
        <Box className={`${classes.warning} orange darken-1}`}>
            <Link
                to={ROUTES.EOL}
                style={{ color: "black", textDecoration: "underline" }}
            >
                Please see this notice on DMK Token Guide EOL.
            </Link>
        </Box>
    );
};

export default EOLWarning;
