import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataType } from "../../redux/actions/userData";
import CollectionPage from "../../components/Page/CollectionPage";
import { GroupCard, PageAnchors } from "../../components/collection/characters";
import CharacterPageSortAnchors from "../../components/collection/characters/CharacterPageSortAnchors";
import { fetchCharacterGroups } from "../../redux/actions/appData";
import {
    useCharacterGroupWithCharsList,
    useCharacterNames
} from "../../hooks/appData/useAppCharacters";

/**
 * Characters page: users keep track of their characters
 */
const Characters = (props) => {
    const { sortCharsByGroup, useReady } = props;

    const { data: appGroups, isLoading: isGroupListLoading } =
        useCharacterGroupWithCharsList();
    const { data: appCharacters, isLoading: isCharNamesListLoading } =
        useCharacterNames();

    const { userData } = useSelector((state) => {
        return state;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCharacterGroups());

        async function fetchUserData() {
            await dispatch(fetchUserDataType("characters"));
            await dispatch(fetchUserDataType("options"));
        }
        fetchUserData();
    }, []);

    /**
     * Returns an array of objects with group names
     * (character group if sorting by group, level #s if sorting by level),
     * with property of array of objects with user character data
     */
    const getDataList = () => {
        if (isGroupListLoading) {
            return [];
        }

        let groupList = [];
        if (sortCharsByGroup) {
            for (let group of appGroups) {
                const { name, characters } = group;

                groupList.push({
                    group: name,
                    characters: characters.map((name) => {
                        if (name !== "R2-D2" && name !== "C-3PO") {
                            return getCharData(name);
                        }
                    })
                });
                // Add SW permanent after Cinderella
                if (name === "Cinderella") {
                    groupList.push({
                        group: "Star Wars (permanent)",
                        characters: [getCharData("R2-D2"), getCharData("C-3PO")]
                    });
                }
            }
        } else {
            const characters = appCharacters.map((name) => {
                return getCharData(name);
            });
            const charsByLevel = _.groupBy(characters, "level");
            for (let i = 1; i <= 10; i++) {
                groupList.push({
                    group: i.toString(),
                    characters: charsByLevel[i]
                });
            }
            groupList.push({ group: "0", characters: charsByLevel[0] });
        }
        return groupList;
    };

    const getCharData = (name) => {
        const userChar = _.find(userData.characters, { name });
        if (userChar) {
            return userChar;
        } else {
            return {
                name,
                level: 0,
                ready: false,
                favorite: false,
                target_level: null
            };
        }
    };

    const dataList = getDataList();

    return (
        <CollectionPage activePage="Characters">
            <CharacterPageSortAnchors />
            <PageAnchors
                list={dataList}
                sortBy={sortCharsByGroup ? "group" : "level"}
                useLevelingData={props.useLevelingData}
            />
            {dataList.map(({ group, characters }) => {
                return (
                    <GroupCard
                        key={group}
                        group={group}
                        characters={characters || []}
                        sortBy={sortCharsByGroup ? "group" : "level"}
                        useReady={useReady}
                        updating={userData.updating}
                        updateSelectedToken={props.updateSelectedToken}
                    />
                );
            })}
        </CollectionPage>
    );
};

export default Characters;
