import axios from "axios";
import { useQuery } from "react-query";
import { userDataKeys } from "../../../utils/queryKeys";

export function useUserCharacters() {
    const query = useQuery(userDataKeys.characters, async () => {
        try {
            return await axios({
                method: "get",
                url: "/api/user/characters"
            });
        } catch (err) {
            return [];
        }
    });

    return { ...query, data: query.data?.data?.characters ?? [] };
}
