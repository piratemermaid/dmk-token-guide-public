import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const SiteWarning = () => {
    return (
        <Box
            className="orange darken-1"
            sx={{ textAlign: "center", padding: "10px 0" }}
        >
            WARNING: The backend is down, which means nothing is working. I am
            working on it.
        </Box>
    );
};

export default SiteWarning;
