import axios from "axios";

export const rickApi = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
});

export const getChar = async(url) => {
    const character = axios.create(
        {
            baseURL: url,
        }
    )
    try{
        const response = await character.get(url);
        return await response.data;
    }catch(e){
        console.error(e)
    }
}
