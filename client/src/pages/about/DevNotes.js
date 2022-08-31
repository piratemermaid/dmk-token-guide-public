import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Loading from "../../components/states/Loading";
import Page from "../../components/Page/Page";
import "../../styles/dev_notes.scss";

const DevNotes = () => {
    const [loading, setLoading] = useState(true);
    const [fix, setFix] = useState([]);
    const [feature, setFeature] = useState([]);
    const [UI, setUI] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        async function getDevNotes() {
            try {
                const res = await axios.get("/api/app/dev_notes");
                const { fix, feature, UI, done } = res.data;
                setFix(fix);
                setFeature(feature);
                setUI(UI);
                setDone(done);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getDevNotes();
    }, []);

    return (
        <Page header="Dev Notes" id="dev-notes">
            <div className="row">
                <div className=" col s12">
                    <p>
                        Hi guys! This is not an official app - I'm just a DMK
                        fan who likes to make websites. The purpose of this site
                        is to take data from the DMK wiki and your collection,
                        and present them so you can easily see token conflicts,
                        plan level-ups, etc. I try to update new info as quickly
                        as I can.
                    </p>
                    <p>
                        Some users have asked if I can put up a Paypal link for
                        donations. In lieu of donating to me, please consider
                        donating to{" "}
                        <a
                            href="https://www.blackgirlscode.com/"
                            target="blank"
                            rel="noreferrer"
                        >
                            Black Girls Code
                        </a>
                        , an organization dedicated to educating and inspiring
                        underprivileged girls of color in STEM. As a woman in a
                        predominantly white and male industry, improving
                        diversity in STEM is a cause near and dear to me.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h3>Contact me</h3>
                    <p>
                        Hit me up at dmktokenguide@gmail.com if you have fixes,
                        feedback, suggestions, etc.
                    </p>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="row">
                    <div className="col s12 m6">
                        <h3>Known issues/todos</h3>
                        <ToDoSection header="Fixes" items={fix} />
                        <ToDoSection header="Features" items={feature} />
                        <ToDoSection header="UI" items={UI} />
                    </div>
                    <div className="col s12 m6">
                        <h3>Latest changes</h3>
                        <ul>
                            {done.map((item) => {
                                return <DoneItem key={item.desc} item={item} />;
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </Page>
    );
};

const ToDoSection = ({ header, items }) => {
    return (
        <>
            <h4>{header}</h4>
            <ul>
                {items.map(({ desc, inProgress }) => {
                    return (
                        <ToDoItem
                            key={desc}
                            desc={desc}
                            inProgress={inProgress}
                        />
                    );
                })}
            </ul>
        </>
    );
};

const ToDoItem = ({ desc, inProgress }) => {
    return (
        <li>
            {desc}
            {inProgress ? " (in progress)" : null}
        </li>
    );
};

const DoneItem = ({ item }) => {
    const { desc, date, type } = item;
    const latest = moment().isBefore(moment(date).add(2, "days"));
    return (
        <li className={latest ? "latest-update" : ""}>
            {getTypeCopy(type)}
            {desc} ({date})
        </li>
    );
};

function getTypeCopy(type) {
    switch (type) {
        case "fix": {
            return "Fixed: ";
        }
        case "feature": {
            return "Feature: ";
        }
        case "change": {
            return "Changed: ";
        }
        case "UI": {
            return "UI: ";
        }
        case "add": {
            return "Added: ";
        }
        default:
            return null;
    }
}

export default DevNotes;
