import axios from "axios";
import { useQuery } from "react-query";
import { appDataKeys } from "../../utils/queryKeys";

export function useCharacterGroupWithCharsList() {
    const query = useQuery(appDataKeys.characterGroups, async () => {
        try {
            return await axios({
                method: "get",
                url: "/api/app/character_group_list"
            });
        } catch (err) {
            return [];
        }
    });

    return { ...query, data: query.data?.data };
}

export function useCharacterNames() {
    const query = useQuery(appDataKeys.characterNames, async () => {
        try {
            return await axios({
                method: "get",
                url: "/api/app/character_names"
            });
        } catch (err) {
            return [];
        }
    });

    return { ...query, data: query.data?.data };
}
