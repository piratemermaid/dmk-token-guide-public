import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CollectionHeader from "./CollectionHeader";
import NoAuthCollection from "../collection/NoAuthCollection";
import Loading from "../states/Loading";

const CollectionPage = ({ activePage, children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const {
        userData: { userDataIsLoaded },
        appData: { appDataIsLoaded },
        appState: { authenticated }
    } = useSelector((state) => {
        return state;
    });

    useEffect(() => {
        if (userDataIsLoaded && appDataIsLoaded) {
            setIsLoading(false);
        }
    }, [userDataIsLoaded, appDataIsLoaded]);

    const getElement = () => {
        if (isLoading) {
            return <Loading />;
        } else if (!authenticated) {
            return <NoAuthCollection type={activePage} />;
        } else {
            return <div className="container">{children}</div>;
        }
    };

    return (
        <>
            <CollectionHeader activePage={activePage} />
            {getElement()}
        </>
    );
};

export default CollectionPage;
