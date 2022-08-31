import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";

import { fetchEventData } from "../../redux/actions/appData";
import Page from "../../components/Page/Page";
import ConflictCard from "../../components/guides/ConflictCard";
import TaskCardRow from "../../components/guides/TaskCardRow";
import { CharacterImg, TokenImg } from "../../components/images";

/**
 * TokenGuide page displays selected character's token conflicts &
 * tasks to get character's tokens
 */
class TokenGuide extends Component {
    constructor(props) {
        super(props);

        this.state = { dropdownInput: [], conflicts: null };

        this.lookup = this.lookup.bind(this);
    }

    // Function to update the selected character when selected
    handleSelectName(selected) {
        this.props.updateSelectedToken(selected.value);
        this.getTokenInfo(selected.value);
        this.setState({ selectInitialValue: selected });
    }

    /**
     * Look up selected image in TokenGuide (character or token)
     * @param {string} name
     * @param {string} type: e.g. "character", "fabric"
     */
    lookup({ name, type }) {
        if (type === "character") {
            window.scrollTo(0, 0);
            let dropdownInfo = _.find(this.state.dropdownInput, {
                label: name
            });
            if (dropdownInfo) {
                this.handleSelectName(dropdownInfo);
            }
        }
    }

    // Return array of conflicts as objects with name & type
    // e.g. [ { name: "Goofy", type: "character" },
    //        { name: "Glitched", type: "fabric" } ]
    async getTokenInfo(selectedToken) {
        // TODO: use collection info to skip stuff if user has option to

        const { name, type } = selectedToken;

        if (type === "character") {
            return axios({
                method: "get",
                url: "/api/app/lookup_character_token",
                params: { name }
            }).then((res) => {
                const { conflicts, tokens } = res.data;
                this.setState({ conflicts, tokenInfo: tokens });
            });
        } else if (type === "costume") {
            const { character } = selectedToken;
            return axios({
                method: "get",
                url: "/api/app/lookup_costume",
                params: { name, character }
            }).then((res) => {
                const { conflicts, tokens } = res.data;
                this.setState({ conflicts, tokenInfo: tokens });
            });
        } else if (type === "special") {
            const { name } = selectedToken;
            return axios({
                method: "get",
                url: "/api/app/lookup_special_token",
                params: { name }
            }).then((res) => {
                const { conflicts } = res.data;
                this.setState({ conflicts, tokenInfo: [res.data] });
            });
        } else {
            const { tokens, type } = selectedToken;

            if (type === "mini event") {
                // look up multiple tokens e.g. for mini event
                const token1 = await axios({
                    method: "get",
                    url: "/api/app/lookup_special_token",
                    params: { name: tokens[0] }
                }).then((res) => {
                    return res.data;
                });

                const token2 = await axios({
                    method: "get",
                    url: "/api/app/lookup_special_token",
                    params: { name: tokens[1] }
                }).then((res) => {
                    return res.data;
                });

                this.setState({
                    tokenInfo: [token1, token2],
                    conflicts: _.concat(token1.conflicts, token2.conflicts)
                });
            } else {
                const { name } = selectedToken;
                return axios({
                    method: "get",
                    url: "/api/app/lookup_special_token",
                    params: { name }
                }).then((res) => {
                    const { conflicts, name, rarity, tasks, type } = res.data;
                    this.setState({
                        conflicts,
                        tokenInfo: [{ name, rarity, tasks, type }]
                    });
                });
            }
        }
    }

    /**
     *
     * @param {object} obj: info e.g. { name: "Dale" } for characters
     * { character: "Elsa", name: "Travel" } for costumes
     * @param {string} type
     */
    useInDropdown(obj, type) {
        if (type === "character") {
            const userChar = _.find(this.props.userData.characters, {
                name: obj.name
            });
            if (userChar) {
                if (userChar.level === 10) {
                    return false;
                }
                if (userChar.level === 9 && userChar.ready) {
                    return false;
                }
            }
        }

        if (type === "costume") {
            const userCostume = _.find(this.props.userData.costumes, {
                name: obj.name,
                character: obj.character
            });
            if (userCostume) {
                return false;
            } else {
                return true;
            }
        }

        return true;
    }

    getDropdownInput = async () => {
        const { skipMaxedInDropdown } = this.props;

        try {
            const res = await axios.get("/api/app/dropdown_order");
            let dropdownInput = [];

            for (let item of res.data) {
                const { label, value } = item;
                if (value.type === "character") {
                    if (
                        !skipMaxedInDropdown ||
                        this.useInDropdown({ name: label }, "character")
                    ) {
                        dropdownInput.push(item);
                    }
                } else if (value.type === "costume") {
                    if (
                        !skipMaxedInDropdown ||
                        this.useInDropdown(
                            { character: value.character, name: value.name },
                            "costume"
                        )
                    ) {
                        dropdownInput.push(item);
                    }
                } else {
                    dropdownInput.push(item);
                }
            }

            this.setState({ dropdownInput });

            // set initial dropdown value if page entered
            // with something selected
            const { selectedToken } = this.props;
            if (selectedToken && selectedToken.name) {
                this.setState({
                    selectInitialValue: _.find(dropdownInput, {
                        label: selectedToken.name
                    })
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Display the image of the character or token selected,
     * do not display anything for mini event or costume
     */
    renderSelectedImg() {
        const { workMode } = this.props.appState;

        if (!this.props.selectedToken.name || workMode) {
            return null;
        }
        const selectedToken = this.props.selectedToken;

        if (selectedToken.type === "character") {
            return (
                <CharacterImg name={selectedToken.name} imgClass="char-img" />
            );
        } else {
            if (
                selectedToken.type !== "mini event" &&
                selectedToken.type !== "costume"
            ) {
                return (
                    <TokenImg
                        name={selectedToken.name}
                        type={selectedToken.type}
                        imgClass="char-img"
                    />
                );
            }
        }
    }

    componentDidMount() {
        this.props.fetchEventData();
        if (this.props.appData.status === "success") {
            this.getDropdownInput();
            if (this.props.selectedToken && this.props.selectedToken.name) {
                this.getTokenInfo(this.props.selectedToken);
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.appData.status === "fetching" &&
            this.props.appData.status === "success"
        ) {
            this.getDropdownInput();
        }
    }

    render() {
        const { selectedToken } = this.props;

        return (
            <Page
                include={
                    <div className="right">{this.renderSelectedImg()}</div>
                }
                header="Token Guide"
                subheader="Look up a character's token conflicts & info"
                id="token-guide"
            >
                <div className="row" style={{ marginTop: "20px" }}>
                    <div id="select-row" className="col s12">
                        {this.state.dropdownInput.length > 0 ? (
                            <Select
                                value={this.state.selectInitialValue}
                                onChange={(e) => this.handleSelectName(e)}
                                options={this.state.dropdownInput}
                                placeholder="Select character..."
                            />
                        ) : (
                            "loading..."
                        )}
                    </div>
                </div>
                {selectedToken && selectedToken.name ? (
                    <div id="results">
                        <ConflictCard
                            conflicts={this.state.conflicts}
                            userData={this.props.userData}
                            appData={this.props.appData}
                            useUserData={this.props.useUserData}
                            selected={selectedToken.name}
                            lookup={this.lookup}
                            event={this.props.appData.event}
                            userCharacters={this.props.userData.characters}
                            tokenOrder={this.props.tokenOrder}
                        />
                        <div className="row">
                            <TaskCardRow
                                userData={this.props.userData}
                                lookup={this.lookup}
                                tokenInfo={this.state.tokenInfo}
                                useUserData={this.props.useUserData}
                            />
                        </div>
                    </div>
                ) : null}
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps, { fetchEventData })(TokenGuide);
