import _ from "lodash";
import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserOptionData } from "../../redux/actions/userData";
import CollectionPage from "../../components/Page/CollectionPage";
import CharacterPageSortAnchors from "../../components/collection/characters/CharacterPageSortAnchors";
import CollectionCharacter from "../../components/collection/characters/CollectionCharacter";
import { OPTIONS } from "../../utils/globals";

/**
 * Characters page: users keep track of their characters
 */
const FavoriteCharacters = (props) => {
    const [favoriteChars, setFavoriteChars] = useState([]);

    const { useReady } = props;

    const { userData, appData } = useSelector((state) => {
        return state;
    });

    useEffect(() => {
        if (userData.userDataIsLoaded && appData.appDataIsLoaded) {
            const favorites = _.filter(userData.characters, { favorite: true });

            const favesSorted = favorites.sort((a, b) => {
                const orderA = _.find(appData.characters, {
                    name: a.name
                }).order;
                const orderB = _.find(appData.characters, {
                    name: b.name
                }).order;
                return orderA - orderB;
            });
            setFavoriteChars(favesSorted);
        }
    }, [
        userData.characters,
        userData.userDataisLoaded,
        appData.appDataIsLoaded
    ]);

    return (
        <CollectionPage activePage="Characters">
            <CharacterPageSortAnchors />
            <div className="col s12">
                <div className="card coll-section">
                    <div className="card-content">
                        <div className="row coll-chars">
                            {favoriteChars.length > 0
                                ? favoriteChars.map((charInfo) => {
                                      return (
                                          <CollectionCharacter
                                              key={charInfo.name}
                                              charInfo={charInfo}
                                              useReady={useReady}
                                              updateSelectedToken={
                                                  props.updateSelectedToken
                                              }
                                              updating={props.userData.updating}
                                              displayTargetLevel={true}
                                          />
                                      );
                                  })
                                : "You have no favorite characters. Use the star to mark a character as a favorite and set a target level."}
                        </div>
                    </div>
                </div>
            </div>
        </CollectionPage>
    );
};

const mapStateToProps = (state) => {
    const { appData, userData } = state;
    return { appData, userData };
};

export default connect(mapStateToProps, { updateUserOptionData })(
    FavoriteCharacters
);
