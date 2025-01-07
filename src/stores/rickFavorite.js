// Importation des modules nécessaires
import { ref } from 'vue'; // Pour rendre l'état réactif
import { v4 as uuid} from 'uuid'; // Pour générer des identifiants uniques
import { defineStore } from 'pinia'; // Pour définir un magasin d'état

// Définition du magasin d'état
export const useFavoriteStore = defineStore('favorite', () => {
    // Initialisation de l'état avec les favoris stockés dans le localStorage
    // Si aucun favori n'est trouvé, une liste vide est utilisée
    // Initialisation de l'état avec les favoris stockés dans le localStorage
    const favorite = ref(JSON.parse(localStorage.getItem('favorite')) || []);

    // Sauvegarde les favoris dans localStorage à chaque mise à jour
    const saveFavorites = () => {
        localStorage.setItem('favorite', JSON.stringify(favorite.value));
    };

    // Méthode pour ajouter un favori
    const addFavorite = (type, data) => {
        let flag = isFavorite(type, data);

        if (flag) return false;

        // créer un nouvel objet favori avec un identifiant unique, le type, les données et la date d'ajout
        const newFavorite = {
            id: uuid(),
            type,
            data,
            addDate: new Date(),
        };
        favorite.value.push(newFavorite);
        saveFavorites();

    }

    const getFavorite = (type, data) => {
        return favorite.value.find((f) => f.type === type && f.data.id === data.id) || null;
    }

    const isFavorite = (type, data) => {
        return favorite.value.some((f) => f.type === type && f.data.id === data.id);
    }

    const deleteFavorite = (id) => {
        favorite.value = favorite.value.filter((value) => value.id !== id);
        saveFavorites();
    };

    return  {favorite,isFavorite,getFavorite, addFavorite, deleteFavorite}


})
