import {rickApi} from '@/api/rickApi';
import {getCharRick} from "@/utils/getCharRick.js";
import {createGenericStore} from "@/stores/rickStore.js";

export const useEpisodeStore = createGenericStore(
    'episode',
    (page) => rickApi.get(`episode?page=${page}`),
    async (episodes) => {
        for (const ep of episodes) {
            ep.characters = await getCharRick(ep.characters)
        }
    }
)