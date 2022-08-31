import axios from "axios";
import { useQuery } from "react-query";
import { user } from "../utils/queryKeys";

const CACHE_TIME = 900000; //15 mins

export function useAuthenticated() {
    const query = useQuery(
        user.authenticated,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/account/authenticated_new"
                });
            } catch (err) {
                return false;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );
    if (query.data) {
        return true;
    } else {
        return false;
    }
}

export function useUser() {
    const query = useQuery(
        user.user,
        async () => {
            try {
                return await axios({
                    method: "get",
                    url: "/api/account/user"
                });
            } catch (err) {
                return false;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: CACHE_TIME
        }
    );

    return query.data?.data;
}
