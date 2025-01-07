import {rickApi} from '@/api/rickApi';
import {createGenericStore} from "@/stores/rickStore.js";

export const useCharacterStore = createGenericStore(
    'character',
    (page, filters) => {
        const queryParams = new URLSearchParams({
            page,
            name: filters.name || '',
            species: filters.species || '',
            gender: filters.gender || '',
            status: filters.status || '',
            type: filters.type || '',
        }).toString();
        return rickApi.get(`character?${queryParams}`);
    },
    null // Pas de traitement spécifique pour les personnages
);
