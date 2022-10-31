import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "./Router/routes";

const useStyles = makeStyles({
    warning: { textAlign: "center", padding: "10px 0" }
});

const EOLUpdate = () => {
    const classes = useStyles();

    return (
        <Box className={`${classes.warning} orange darken-3`}>
            <Link
                to={ROUTES.EOL_UPDATE}
                style={{ color: "black", textDecoration: "underline" }}
            >
                Update on EOL and Data Export
            </Link>
        </Box>
    );
};

export default EOLUpdate;
