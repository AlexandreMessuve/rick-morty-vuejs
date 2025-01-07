import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { CACHE_EXPIRATION_TIME } from '@/constants/constant.js';

export function createGenericStore(name, fetchApi, processData) {
    return defineStore(name, () => {
        const state = reactive({
            results: [],
            currentPage: 1,
            firstPage: 1,
            maxPage: 0,
            count: 0,
            cache: {},
        });

        const fetchData = async (filters = {}) => {
            const cacheKey = `${state.currentPage}-${JSON.stringify(filters)}`;
            const cachedData = state.cache[cacheKey];
            const now = Date.now();

            if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
                state.results = cachedData.results;
                state.maxPage = cachedData.maxPage;
                state.count = cachedData.count;
            } else {
                try {
                    const response = await fetchApi(state.currentPage, filters);
                    const data = response.data;

                    state.results = data.results;
                    state.maxPage = data.info.pages;
                    state.count = data.info.count;

                    state.cache[cacheKey] = {
                        results: data.results,
                        maxPage: data.info.pages,
                        count: data.info.count,
                        timestamp: now,
                    };

                    if (processData) {
                        await processData(state.results);
                    }
                } catch (error) {
                    state.results = [];
                }
            }
        };

        const changePage = async (page, filters = {}) => {
            state.currentPage = page;
            await fetchData(filters);
        };

        return { state, fetchData, changePage };
    });
}
