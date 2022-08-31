import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

import { useEvent, useEventDates, useEventReqLevels } from "../../hooks/event";
import Page from "../../components/Page/Page";
import ReqLevelsTableEntry from "./components/ReqLevelsTableEntry";
import Storyline from "./components/Storyline";
import Loading from "../../components/states/Loading";
import { CharacterImg, GroupImg } from "../../components/images";

const useStyles = makeStyles({
    textNextToImg: {
        position: "relative",
        marginLeft: "8px",
        bottom: "18px"
    },
    biggerFont: { fontSize: "1.2rem" }
});

const EventPage = () => {
    const [loading, setLoading] = React.useState(true);

    const event = useEvent();
    const eventDates = useEventDates();
    const eventReqLevels = useEventReqLevels();

    const classes = useStyles();

    useEffect(() => {
        if (event) {
            setLoading(false);
        }
    }, [event]);

    if (loading) {
        return <Loading />;
    }

    const helper = _.find(event.groups, { type: "helper" });

    return (
        <Page
            header={
                event?.type === "Regular"
                    ? event.name
                    : "No current regular event"
            }
            subheader={event?.type === "Regular" ? null : "Past event details:"}
            id="event-page"
        >
            <div className="card">
                <div className="card-content">
                    {helper ? (
                        <>
                            <h5>Helper Collection:</h5>
                            <GroupImg
                                name={helper.name}
                                imgClass="collection-link"
                            />
                            <span
                                className={clsx(
                                    classes.textNextToImg,
                                    classes.biggerFont
                                )}
                            >
                                {helper.name}
                            </span>
                        </>
                    ) : null}
                    {_.find(event?.characters, { premium: true }) ? (
                        <>
                            <h5>Premiums:</h5>
                            <ul>
                                {event.characters.map(({ name, premium }) => {
                                    if (premium) {
                                        return (
                                            <li key={name}>
                                                <CharacterImg name={name} />
                                                <span
                                                    className={
                                                        classes.textNextToImg
                                                    }
                                                >
                                                    {name}
                                                </span>
                                            </li>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </ul>
                        </>
                    ) : null}
                    {eventDates && eventReqLevels ? (
                        <>
                            <h5>Required levels:</h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th />
                                        {eventDates.map(({ date }) => {
                                            return <th key={date}>{date}</th>;
                                        })}
                                    </tr>
                                    {eventReqLevels.map(({ name, levels }) => {
                                        return (
                                            <tr key={name}>
                                                <th>{name}</th>
                                                {levels.map((level, index) => (
                                                    <td
                                                        key={`${name}-${index}`}
                                                    >
                                                        <ReqLevelsTableEntry
                                                            name={name}
                                                            level={level}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </thead>
                            </table>
                        </>
                    ) : null}
                    <h3>Storyline:</h3>
                    <Storyline />
                </div>
            </div>
        </Page>
    );
};

export default EventPage;
