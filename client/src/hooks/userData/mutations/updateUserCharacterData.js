import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { userDataKeys } from "../../../utils/queryKeys";

async function updateUserCharacterData({
    name,
    level,
    ready,
    favorite,
    target_level
}) {
    await axios({
        method: "post",
        url: "/api/user/update_character",
        params: { name, level, ready, favorite, target_level }
    });
}

export function useUpdateUserCharacterData(data) {
    const queryClient = useQueryClient();

    const { mutate } = useMutation((data) => updateUserCharacterData(data), {
        onSuccess: () => queryClient.invalidateQueries(userDataKeys.characters)
    });

    return mutate;
}
