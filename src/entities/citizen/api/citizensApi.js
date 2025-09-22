import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCitizen, getCitizens, getStatistic, updateCitizen } from "./mockServer";

const citizensTag = "citizens";

export const citizensApi = createApi({
    reducerPath: "citizensReducer",
    baseQuery: fakeBaseQuery(),
    tagTypes: [citizensTag],
    endpoints: build => ({
        fetchCitizens: build.query({
            queryFn: async (queryParams) => {
                try {
                    const data = await getCitizens(queryParams);
                    return { data };
                } catch {
                    return { error: { message: 'Не удалось получить список пользователей' } };
                }
            },
            providesTags: () => [citizensTag],
        }),
        fetchCitizen: build.query({
            queryFn: async (id) => {
                try {
                    const data = await getCitizen(id);
                    return { data };
                } catch {
                    return { error: { message: 'Не удалось получить указанного пользователя' } };
                }
            },
            providesTags: () => [citizensTag],
        }),
        updateCitizen: build.mutation({
            queryFn: async (partialCitizen) => {
                try {
                    await updateCitizen(partialCitizen);
                    return { data: '' };
                } catch {
                    return { error: { message: 'Редактирование не удалось' } };
                }
            },
            invalidatesTags: [citizensTag],
        }),
        fetchStats: build.query({
            queryFn: async () => {
                try {
                    const data = await getStatistic();
                    return { data };
                } catch {
                    return { error: { message: 'Не удалось получить указанного пользователя' } };
                }
            },
            providesTags: () => [citizensTag],
        }),
    })
});