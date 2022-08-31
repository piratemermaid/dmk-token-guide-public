import _ from "lodash";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
    fetchUserDataType,
    updateUserCostumeData
} from "../../redux/actions/userData";
import ScrollToTop from "./ScrollToTop";
import CostumePageAnchor from "../../components/collection/costumes/CostumePageAnchor";
import CollectionPage from "../../components/Page/CollectionPage";
import PageAnchors from "../../components/collection/PageAnchors";
import { getImgName } from "../../utils/utils";

const Costumes = (props) => {
    const { appData, userData, appState } = props;
    const { workMode } = appState;

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchUserData() {
            await dispatch(fetchUserDataType("costumes"));
            await dispatch(fetchUserDataType("options"));
        }
        fetchUserData();
    }, []);

    let costumeChars = [];
    for (let { character, name } of appData.costumes) {
        if (!_.find(costumeChars, { character })) {
            costumeChars.push({ character, costumes: [name] });
        } else {
            const index = _.findIndex(costumeChars, { character });
            costumeChars[index].costumes.push(name);
        }
    }

    return (
        <CollectionPage activePage="Costumes">
            <PageAnchors
                data={costumeChars.map(({ character, costumes }) => {
                    return { name: character, members: costumes };
                })}
                className="costume-link"
                AnchorEl={CostumePageAnchor}
                divider={workMode}
            />
            {costumeChars.map(({ character, costumes }) => {
                return (
                    <div
                        id={character}
                        className="coll-costume row"
                        key={character}
                    >
                        <p className="item-info-group">{character}</p>
                        {costumes.map((name) => {
                            const obtained = _.find(userData.costumes, {
                                name,
                                character
                            });
                            if (!workMode) {
                                return (
                                    <div
                                        className={`col coll-costume ${
                                            userData.updating &&
                                            userData.updating.name === name &&
                                            userData.updating.character ===
                                                character
                                                ? "updating"
                                                : null
                                        } ${
                                            !obtained
                                                ? "unobtained"
                                                : "obtained"
                                        }`}
                                        onClick={() =>
                                            props.updateUserCostumeData(
                                                name,
                                                character
                                            )
                                        }
                                        key={`${character} ${name}`}
                                    >
                                        {obtained ? (
                                            <div
                                                className="coll-obtained-bg
                                                coll-costume-obtained-bg"
                                            ></div>
                                        ) : null}
                                        <img
                                            src={`/img/costumes/${getImgName(
                                                character
                                            )}-${getImgName(name)}.png`}
                                            alt={`${character} ${name} Costume`}
                                            title={`${character} ${name} Costume`}
                                        />
                                        <p className="coll-costume-name">{`${name}`}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        className={`checkbox-wrapper ${
                                            userData.updating &&
                                            userData.updating.name === name &&
                                            userData.updating.character ===
                                                character
                                                ? "updating"
                                                : null
                                        }`}
                                        onClick={() =>
                                            props.updateUserCostumeData(
                                                name,
                                                character
                                            )
                                        }
                                        key={`${character} ${name}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                _.find(userData.costumes, {
                                                    name,
                                                    character
                                                })
                                                    ? true
                                                    : false
                                            }
                                            onChange={() =>
                                                props.updateUserCostumeData(
                                                    name,
                                                    character
                                                )
                                            }
                                        />
                                        <span>{`${name} Costume`}</span>
                                    </div>
                                );
                            }
                        })}
                    </div>
                );
            })}
            <span className="right margin-bottom">
                <ScrollToTop />
            </span>
        </CollectionPage>
    );
};

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps, {
    updateUserCostumeData
})(Costumes);
