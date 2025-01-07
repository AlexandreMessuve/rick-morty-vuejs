// Importation des modules nécessaires
import {rickApi} from '@/api/rickApi'; // API pour récupérer les données
import {getCharRick} from "@/utils/getCharRick.js";
import {createGenericStore} from "@/stores/rickStore.js"; // Pour définir un magasin d'état

// Définition du magasin d'état
export const useLocationStore = createGenericStore(
    'location',
    (page) => rickApi.get(`location?page=${page}`),
    async (locations) => {
        for (const loc of locations) {
            loc.residents = await getCharRick(loc.residents)
        }
    }
)