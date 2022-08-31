import { useSelector } from "react-redux";
import clsx from "clsx";
import { Card as CardMUI, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// card content styles for when we switch to MUI
const useStyles = makeStyles({
    card: { padding: "0 30px !important" },
    cardTitle: { paddingBottom: 0 },
    nightModeCard: {
        background: "#9e9e9e !important",
        color: "#e0e0e0 !important"
    }
});

const Card = ({ title, children }) => {
    const { nightMode } = useSelector((state) => state.appState);

    const classes = useStyles();

    return (
        <CardMUI
            variant="outlined"
            className={clsx(
                classes.card,
                nightMode ? classes.nightModeCard : ""
            )}
        >
            <div className={classes.cardTitle}>
                <h3 style={{ marginBottom: 0 }}>{title}</h3>
            </div>
            <CardContent>{children}</CardContent>
        </CardMUI>
    );
};

export default Card;
