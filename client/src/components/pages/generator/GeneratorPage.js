import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    pageContainer: {
        padding: "20px 40px"
    },
    content: { marginTop: "20px" }
});

const GeneratorPage = ({ title, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.pageContainer}>
            <Typography variant="h4" className={classes.title}>
                {title}
            </Typography>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

export default GeneratorPage;
