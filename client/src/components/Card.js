import { useSelector } from "react-redux";
import { Box, Card as CardMUI, CardContent, Typography } from "@mui/material";

const nightModeCardSx = {
    background: "#9e9e9e !important",
    color: "#e0e0e0 !important"
};

const Card = ({ title, children }) => {
    const { nightMode } = useSelector((state) => state.appState);

    return (
        <CardMUI
            variant="outlined"
            sx={{
                ...(nightMode ? nightModeCardSx : {}),
                padding: "0 30px !important"
            }}
        >
            <Box sx={{ paddingBottom: 0 }}>
                <h3 style={{ marginBottom: 0 }}>{title}</h3>
            </Box>
            <CardContent>{children}</CardContent>
        </CardMUI>
    );
};

export default Card;
