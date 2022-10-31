import _ from "lodash";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
    fetchUserDataType,
    updateUserFloatData
} from "../../redux/actions/userData";
import CollectionPage from "../../components/Page/CollectionPage";
import ScrollToTop from "./ScrollToTop";
import FloatImg from "../../components/images/FloatImg";

const Floats = (props) => {
    const { appData, userData, appState } = props;
    const { workMode } = appState;

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchUserData() {
            await dispatch(fetchUserDataType("floats"));
            await dispatch(fetchUserDataType("options"));
        }
        fetchUserData();
    }, []);

    function displayFloats() {
        return appData.groups.map(({ name }) => {
            // Haunted Mansion group does not have a float, skip it
            if (name === "Haunted Mansion") {
                return null;
            }

            const obtained = _.find(userData.floats, { name });

            if (!workMode) {
                return (
                    <div
                        className={`col coll-float ${
                            userData.updating && userData.updating.name === name
                                ? "updating"
                                : null
                        } ${!obtained ? "unobtained" : ""}`}
                        onClick={() => props.updateUserFloatData(name)}
                        key={`${name} float`}
                    >
                        {obtained ? (
                            <div className="coll-obtained-bg coll-float-obtained-bg"></div>
                        ) : null}
                        <FloatImg name={name} className="coll-float-img" />
                        <p className="coll-float-name">{name}</p>
                    </div>
                );
            } else {
                return (
                    <div
                        className={`checkbox-wrapper ${
                            userData.updating && userData.updating.name === name
                                ? "updating"
                                : null
                        }`}
                        onClick={() => props.updateUserFloatData(name)}
                        key={`${name} float`}
                    >
                        <input
                            type="checkbox"
                            checked={
                                _.find(userData.floats, { name }) ? true : false
                            }
                            onChange={() => props.updateUserFloatData(name)}
                        />
                        <span>{name}</span>
                    </div>
                );
            }
        });
    }

    return (
        <CollectionPage activePage="Floats">
            <div className="row">{displayFloats()}</div>
            <span className="hide-on-med-and-up right margin-bottom">
                <ScrollToTop />
            </span>
        </CollectionPage>
    );
};

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps, { updateUserFloatData })(Floats);
