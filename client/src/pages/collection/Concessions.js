import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    fetchUserDataType,
    updateUserConcessionData
} from "../../redux/actions/userData";
import CollectionPage from "../../components/Page/CollectionPage";
import CollectionConcession from "../../components/collection/concessions/CollectionConcession";
import ScrollToTop from "./ScrollToTop";

const sortTypes = {
    alphabetical: "alphabetical",
    time: "time",
    magic: "magic",
    group: "group",
    type: "type",
    rarity: "rarity",
    unobtained: "unobtained"
};

class Concessions extends Component {
    constructor(props) {
        super(props);

        this.state = { sort: sortTypes.alphabetical };
    }

    sortConcessions() {
        const { concessions, buildingGroupOrder } = this.props.appData;
        const { sort } = this.state;

        if (sort === sortTypes.time) {
            //eslint-disable-next-line
            return concessions.sort(function (a, b) {
                if (!a.time && !b.time) {
                    return 0;
                }
                if (!a.time) {
                    return 1;
                }
                if (!b.time) {
                    return -1;
                }

                const timeA = parseInt(a.time, 10);
                const unitsA = a.time[a.time.length - 1];
                const timeB = parseInt(b.time, 10);
                const unitsB = b.time[b.time.length - 1];

                if (unitsA === unitsB) {
                    return timeA - timeB;
                } else {
                    if (unitsA === "m") {
                        return -1;
                    } else if (unitsB === "m") {
                        return 1;
                    }
                }
            });
        } else if (sort === sortTypes.magic) {
            return _.sortBy(concessions, "magic");
        } else if (sort === sortTypes.group) {
            return concessions.sort(function (a, b) {
                const groupA = a.group;
                const groupB = b.group;
                if (groupA && groupB) {
                    const indexA = _.findIndex(buildingGroupOrder, {
                        name: groupA
                    });
                    const indexB = _.findIndex(buildingGroupOrder, {
                        name: groupB
                    });
                    return indexA - indexB;
                } else {
                    if (groupA && !groupB) {
                        return -1;
                    } else if (groupB && !groupA) {
                        return 1;
                    } else {
                        return a.name - b.name;
                    }
                }
            });
        } else if (sort === sortTypes.rarity) {
            return _.sortBy(concessions, "rarity");
        } else if (sort === sortTypes.unobtained) {
            const unobtained = _.compact(
                concessions.map((conc) => {
                    if (
                        !_.find(this.props.userData.concessions, {
                            name: conc.name
                        })
                    ) {
                        return conc;
                    } else {
                        return null;
                    }
                })
            );
            return _.sortBy(unobtained, "name");
        } else if (sort === sortTypes.type) {
            const types = ["Drink", "Headwear", "Souvenir", "Food"];
            return concessions.sort(function (a, b) {
                const indexA = _.indexOf(types, a.category);
                const nameA = a.name;
                const indexB = _.indexOf(types, b.category);
                const nameB = b.name;

                if (!indexA) {
                    return 1;
                }
                if (!indexB) {
                    return -1;
                }

                if (indexA !== indexB) {
                    return indexA - indexB;
                } else {
                    return nameA - nameB;
                }
            });
        } else {
            return _.sortBy(concessions, "name");
        }
    }

    changeSort(sort) {
        this.setState({ sort });
    }

    displayConcessions() {
        const concessions = this.sortConcessions();
        return concessions.map((concession) => {
            const obtained = _.find(this.props.userData.concessions, {
                name: concession.name
            })
                ? true
                : false;
            return (
                <div className="row" key={concession.name}>
                    <CollectionConcession
                        concession={concession}
                        obtained={obtained}
                        updating={this.props.userData.updating}
                        updateUserConcessionData={
                            this.props.updateUserConcessionData
                        }
                        sort={this.state.sort}
                        sortTypes={sortTypes}
                    />
                </div>
            );
        });
    }

    renderSortAnchors() {
        let sortAnchors = [];
        let index = 0;

        for (let type in sortTypes) {
            index++;
            sortAnchors.push(
                <a
                    key={type}
                    className={`building-sort ${
                        this.state.sort === type ? "active-sort" : null
                    }`}
                    onClick={() => this.changeSort(type)}
                >
                    {type}
                </a>
            );
            if (index < Object.keys(sortTypes).length) {
                sortAnchors.push(<span key={index}> | </span>);
            }
        }

        return sortAnchors;
    }

    componentDidMount() {
        this.props.fetchUserDataType("concessions");
        this.props.fetchUserDataType("options");
    }

    render() {
        return (
            <CollectionPage activePage="Concessions">
                <div className="row">
                    <div className="col s12" style={{ marginBottom: "12px" }}>
                        Sort: {this.renderSortAnchors()}
                    </div>
                    <div className="col s12">
                        {this.displayConcessions()}
                        <div className="row right">
                            <ScrollToTop />
                        </div>
                    </div>
                </div>
            </CollectionPage>
        );
    }
}
const mapStateToProps = (state) => {
    const { appData, userData } = state;
    return { appData, userData };
};

export default connect(mapStateToProps, {
    fetchUserDataType,
    updateUserConcessionData
})(Concessions);
