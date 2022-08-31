import React from "react";

const NoAuthCollection = () => {
    return (
        <div className="container">
            <div className="col s12">
                You are not logged in. <a href="/login">Log in</a> or{" "}
                <a href="/signup">sign up</a> to keep track of your collection
                data!
            </div>
        </div>
    );
};

export default NoAuthCollection;
