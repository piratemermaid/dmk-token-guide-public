import axios from "axios";
import { useQuery } from "react-query";
import { eventKeys } from "../utils/queryKeys";

// const CACHE_TIME = 3000; // 3s, for testing
const CACHE_TIME = 900000; //15 mins

export function useEvent() {
    const query = useQuery(
        eventKeys.event,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/event_new"
                });
            } catch (err) {
                return null;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    return query.data?.data;
}

export function useEventDates() {
    const query = useQuery(
        eventKeys.dates,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/event/dates"
                });
            } catch (err) {
                return null;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    return query.data?.data;
}

export function useEventReqLevels() {
    const query = useQuery(
        eventKeys.reqLevels,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/event/req_levels"
                });
            } catch (err) {
                return null;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    return query.data?.data;
}

export function useEventStoryline() {
    const query = useQuery(
        eventKeys.storyline,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/event_storyline"
                });
            } catch (err) {
                return null;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    return query.data?.data;
}

export function useGoldTrophyDrops() {
    const query = useQuery(
        eventKeys.trophies,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/gold_trophy_drops"
                });
            } catch (err) {
                return null;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    return query.data?.data;
}
