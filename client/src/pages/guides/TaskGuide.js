import _ from "lodash";
import React, { Component } from "react";
import clsx from "clsx";
import Select from "react-select";
import axios from "axios";
import { connect } from "react-redux";

import Page from "../../components/Page/Page";
import TaskList from "../../components/guides/TaskList";
import Loading from "../../components/states/Loading";
import { sortTasksByTime } from "../../utils/utils";

/**
 * TaskGuide page displays the selected character's tasks
 */
class TaskGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "",
            taskList: [],
            sortedTasks: [],
            sortBy: "level"
        };

        this.handleSelectName = this.handleSelectName.bind(this);
        this.sortTasks = this.sortTasks.bind(this);
    }

    handleSelectName(name) {
        this.setState({ selected: name.value });
        this.getTasks(name.value);
    }

    handleSortChange(sortBy) {
        this.setState({ sortBy });
        if (this.state.tasks?.length) {
            this.setState({
                sortedTasks: this.sortTasks(this.state.tasks, sortBy)
            });
        }
    }

    sortTasks(tasks, sortBy) {
        const { selected } = this.state;

        if (sortBy === "level") {
            return tasks.sort((a, b) => {
                const charA = _.find(a.taskCharacters, { name: selected });
                const levelA = charA.level;
                const charB = _.find(b.taskCharacters, { name: selected });
                const levelB = charB.level;

                return levelA - levelB;
            });
        } else {
            return sortTasksByTime(tasks);
        }
    }

    // TODO: skip obtained characters' tokens
    async getTasks(name) {
        const res = await axios({
            method: "get",
            url: "/api/app/lookup_character",
            params: { name }
        });

        const { tasks } = res.data;

        this.setState({
            tasks,
            sortedTasks: this.sortTasks(tasks, this.state.sortBy)
        });
    }

    render() {
        if (!this.props.appData) {
            return <Loading />;
        }

        return (
            <Page
                header="Task Guide"
                subheader="Look up a character's tasks"
                id="task-guide"
            >
                <div className="row" style={{ marginTop: "20px" }}>
                    <div id="select-row-task-guide" className="col s12">
                        <Select
                            value={this.state.selected}
                            onChange={this.handleSelectName}
                            options={this.props.appData.characters.map(
                                ({ name }) => {
                                    return { value: name, label: name };
                                }
                            )}
                            placeholder="Select character..."
                        />
                    </div>
                </div>
                <div className="row center">
                    Sort by:{" "}
                    <span
                        onClick={() => this.handleSortChange("level")}
                        className={clsx(
                            "sort-selector",
                            this.state.sortBy === "level" && "selected"
                        )}
                    >
                        Level
                    </span>{" "}
                    |{" "}
                    <span
                        onClick={() => this.handleSortChange("time")}
                        className={clsx(
                            "sort-selector",
                            this.state.sortBy === "time" && "selected"
                        )}
                    >
                        Time
                    </span>
                </div>
                <div className="row">
                    <div className="col l6 offset-l3 s12">
                        {this.state.selected && this.state.tasks ? (
                            <TaskList
                                sortBy={this.state.sortBy}
                                sortTasks={this.sortTasks}
                                selected={this.state.selected}
                                tasks={this.state.sortedTasks}
                                useUserData={this.props.useUserData}
                                characters={this.props.appData.characters}
                            />
                        ) : null}
                    </div>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const { appData, userData } = state;
    return { appData, userData };
};

export default connect(mapStateToProps)(TaskGuide);
