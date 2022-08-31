import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import ROUTES from "../../Router/routes";
import GeneratorPage from "./GeneratorPage";

const useStyles = makeStyles({
    link: {
        background: "#eeeeee",
        padding: "10px",
        borderRadius: "15%",
        fontWeight: 600,
        textTransform: "uppercase",
        "&:hover": {
            background: "#e0e0e0"
        }
    }
});

const Generator = () => {
    const classes = useStyles();

    return (
        <GeneratorPage title="Generator">
            <Link to={ROUTES.GENERATOR_TASK} className={classes.link}>
                Task
            </Link>
        </GeneratorPage>
    );
};

export default Generator;
