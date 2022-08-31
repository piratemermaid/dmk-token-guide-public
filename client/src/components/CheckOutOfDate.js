import { useLatestVersion } from "../hooks/appData";

import OutOfDate from "./states/OutOfDate";

const CheckOutOfDate = ({ userVersion }) => {
    const latestVersion = useLatestVersion();

    return (
        <>
            {latestVersion?.version &&
            userVersion !== latestVersion?.version ? (
                <OutOfDate />
            ) : null}
        </>
    );
};

export default CheckOutOfDate;
