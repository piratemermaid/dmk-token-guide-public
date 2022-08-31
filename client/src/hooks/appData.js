import axios from "axios";
import { useQuery } from "react-query";
import { appDataKeys } from "../utils/queryKeys";

const CACHE_TIME = 900000; //15 mins

export function useCharacterNames() {
    const query = useQuery(
        appDataKeys.characterNames,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/character_names"
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
    return query.data?.data;
}

export function useBuildingNames() {
    const query = useQuery(
        appDataKeys.buildingNames,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/building_names"
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
    return query.data?.data;
}

export function useCostumes() {
    const query = useQuery(
        appDataKeys.costumes,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/costume_list"
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

export function useCharacterGroups() {
    const query = useQuery(
        appDataKeys.characterGroups,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/character_group_list_strings"
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
    return query.data?.data;
}

export function useSpecialTokens() {
    const query = useQuery(
        appDataKeys.specialTokens,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/special_token_list_strings"
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
    return query.data?.data;
}

export function useCharacterTokenData(name) {
    const query = useQuery(
        `${appDataKeys.characterConflicts}-${name}`,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/lookup_character_token",
                    params: { name }
                });
            } catch (err) {
                return [];
            }
        },
        {
            cacheTime: Infinity,
            refetchInterval: CACHE_TIME
        }
    );

    const fallback = {
        conflicts: [],
        tokens: [{ rarity: null }, { rarity: null }]
    };

    return { data: query.data?.data || fallback, isLoading: query.isLoading };
}

export function useLatestVersion() {
    const query = useQuery(
        appDataKeys.latestVersion,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/app/latest_version"
                });
            } catch (err) {
                return [];
            }
        },
        {
            cacheTime: Infinity,
            refetchInterval: CACHE_TIME,
            notifyOnChangeProps: ["data"]
        }
    );
    return query.data?.data;
}
