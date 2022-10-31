import axios from "axios";
import { useQuery } from "react-query";
import { userDataKeys } from "../utils/queryKeys";

const CACHE_TIME = 900000; //15 mins

export function useUserCharacters() {
    const query = useQuery(
        userDataKeys.characters,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/user/characters"
                });
            } catch (err) {
                return [];
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );

    return {
        data: query.data?.data?.characters,
        isFetching: query.data?.isFetching
    };
}

export function useUserBuildings() {
    const query = useQuery(
        userDataKeys.buildings,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/user/attractions"
                });
            } catch (err) {
                return [];
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    return query.data?.data?.buildings;
}

export function useUserCostumes() {
    const query = useQuery(
        userDataKeys.costumes,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/user/costumes"
                });
            } catch (err) {
                return [];
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    return query.data?.data?.costumes;
}
