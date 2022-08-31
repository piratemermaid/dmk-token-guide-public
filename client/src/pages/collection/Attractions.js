import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataType } from "../../redux/actions/userData";
import { fetchAttractionGroupOrder } from "../../redux/actions/appData";

import CollectionPage from "../../components/Page/CollectionPage";
import PageSort from "../../components/collection/PageSort";
import PageAnchors from "../../components/collection/PageAnchors";
import AttractionPageAnchor from "../../components/collection/attractions/AttractionPageAnchor";
import AttractionGroup from "../../components/collection/attractions/AttractionGroup";

const Attractions = () => {
    const [sort, setSort] = useState("group");
    // Array of objects: { name: "", members: [] }
    const [groupedBuildings, setGroupedBuildings] = useState({});

    const sortTypes = ["group", "category", "theme", "alphabetical"];

    const {
        appData: {
            buildings: appBuildings,
            buildingGroupOrder,
            appDataIsLoaded
        },
        appState: { workMode }
    } = useSelector((state) => {
        return state;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAttractionGroupOrder());
        dispatch(fetchUserDataType("attractions"));
        dispatch(fetchUserDataType("options"));
    }, []);

    // Update building list on sort change
    useEffect(() => {
        if (appDataIsLoaded) {
            if (sort === "group") {
                const groupList = buildingGroupOrder.map(({ name }) => {
                    return name;
                });
                groupList.unshift("Disney Parks");
                groupList.push("None");

                const groupsFormatted = groupList.map((name) => {
                    if (name === "Disney Parks") {
                        return {
                            name,
                            members: _.filter(appBuildings, {
                                enchantment_group: "Disney Parks"
                            })
                        };
                    } else if (name === "None") {
                        return {
                            name,
                            members: _.filter(appBuildings, {
                                enchantment_group: null,
                                group: null
                            })
                        };
                    } else {
                        return {
                            name,
                            members: _.filter(appBuildings, { group: name })
                        };
                    }
                });
                setGroupedBuildings(groupsFormatted);
            } else if (sort === "category") {
                let sorted = [];
                for (let building of appBuildings) {
                    const { unlock_type } = building;
                    if (!unlock_type) {
                        unlock_type = "none";
                    }
                    if (!_.find(sorted, { name: unlock_type })) {
                        sorted.push({ name: unlock_type, members: [] });
                    }
                    _.find(sorted, { name: unlock_type }).members.push(
                        building
                    );
                }
                setGroupedBuildings(sorted);
            } else if (sort === "theme") {
                let sorted = [];
                for (let building of appBuildings) {
                    const { theme } = building;
                    if (theme) {
                        if (!_.find(sorted, { name: theme })) {
                            sorted.push({ name: theme, members: [] });
                        }
                        _.find(sorted, { name: theme }).members.push(building);
                    }
                }
                setGroupedBuildings(sorted);
            }
            // alphabetical
            else {
                let sorted = alphabetArr.map((letter) => {
                    return { name: letter, members: [] };
                });
                for (let building of appBuildings) {
                    const first = building.name.charAt(0);
                    _.find(sorted, { name: first }).members.push(building);
                }
                setGroupedBuildings(sorted);
            }
        }
    }, [sort, appDataIsLoaded, buildingGroupOrder]);

    return (
        <CollectionPage activePage="Attractions">
            <PageSort sort={sort} updateSort={setSort} sortTypes={sortTypes} />
            {groupedBuildings && (
                <PageAnchors
                    data={groupedBuildings}
                    AnchorEl={AttractionPageAnchor}
                    className="building-sort"
                    divider={workMode || sort !== "group"}
                    sort={sort}
                />
            )}
            <div className="row">
                <div className="col s12">
                    {_.map(groupedBuildings, ({ name, members }) => {
                        return (
                            <AttractionGroup
                                key={name}
                                group={name}
                                groupBuildings={members}
                                sort={sort}
                            />
                        );
                    })}
                </div>
            </div>
        </CollectionPage>
    );
};

const alphabetArr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];

export default Attractions;
