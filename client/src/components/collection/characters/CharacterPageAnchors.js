import React from "react";
import { connect } from "react-redux";
import { getGroupStatus, getImgName } from "../../../utils/utils";
import { Link as ScrollLink } from "react-scroll";

/**
 * CharacterPageAnchors displays character group images that jump to page anchors
 * for quick navigation to a specific character group.
 * Parent: Characters
 */
const CharacterPageAnchors = (props) => {
    const { useLevelingData, groups, appState } = props;
    const { workMode } = appState;

    function getLinkClass(group, splitType) {
        let linkClass = "collection-link";
        if (workMode) {
            linkClass += " workMode";
        }
        if (useLevelingData) {
            const groupStatus = getGroupStatus(
                group,
                props.userData.characters,
                props.appData.groups,
                splitType
            );
            linkClass += ` coll-${groupStatus}`;
        }

        return linkClass;
    }

    /**
     * Return the image page anchor for the group
     * @param {label} string: the label (e.g. "Star Wars (permanent)")
     * @param {name} string: the actual group name (same as label for most groups)
     */
    const GroupAnchorImg = ({ label, name }) => {
        return (
            <ScrollLink to={label} key={label} smooth={true} duration={260}>
                <img
                    className={getLinkClass(name)}
                    src={`/img/collections/${getImgName(name)}.png`}
                    alt={name}
                    title={name}
                />
            </ScrollLink>
        );
    };

    /**
     * Return the text page anchor for the group (work mode)
     * @param {label} string: the label (e.g. "Star Wars (permanent)")
     * @param {nickname} string: shortened group name for work mode
     */
    const GroupAnchorText = ({ label, nickname, linkClass }) => {
        return (
            <ScrollLink
                to={label}
                key={label}
                smooth={true}
                duration={260}
                className={linkClass}
            >
                {nickname || label}
            </ScrollLink>
        );
    };

    if (!workMode) {
        return (
            <div className="row">
                <div className="col s12">
                    {groups.map(({ name }) => {
                        if (name === "Cinderella") {
                            return [
                                GroupAnchorImg({ label: name, name }),
                                GroupAnchorImg({
                                    label: "Star Wars (permanent)",
                                    name: "Star Wars"
                                })
                            ];
                        }
                        return GroupAnchorImg({ label: name, name });
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className="row">
                <div className="col s12">
                    {groups.map(({ name, nickname }) => {
                        let splitType;
                        if (name === "Star Wars") {
                            splitType = "event";
                        }
                        if (name === "Cinderella") {
                            return [
                                GroupAnchorText({
                                    label: name,
                                    nickname,
                                    linkClass: getLinkClass(name)
                                }),
                                GroupAnchorText({
                                    label: "Star Wars (permanent)",
                                    nickanme: "SW (permanent)",
                                    linkClass: getLinkClass("Star Wars", "perm")
                                })
                            ];
                        } else {
                            return GroupAnchorText({
                                label: name,
                                nickname,
                                linkClass: getLinkClass(name, splitType)
                            });
                        }
                    })}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps)(CharacterPageAnchors);
