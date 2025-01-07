import {getChar} from '@/api/rickApi';

const characterCache = new Map();

export async function getCharRick(urls) {
    const results = [];
    const requests = [];

    urls.forEach((url) => {
        if (characterCache.has(url)) {
            results.push(characterCache.get(url));
        } else {
            requests.push(getChar(url).then((data) => {
                characterCache.set(url, data);
                results.push(data);
            }));
        }
    });

    await Promise.all(requests);
    return results;
}