import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { citizensApi } from "../entities/citizen";
import { paginationCitizensReducer, paginationCitizensSlice } from "../features/paginationCitizens";
import { searchCitizensReducer, searchCitizensSlice } from "../features/searchCitizens";

export const rootReducer = combineReducers({
    [citizensApi.reducerPath]: citizensApi.reducer,
    paginationCitizensReducer,
    searchCitizensReducer,
});


// мидлварина для сброса пагинации при изменении значения поиска
const { setSearchQuery } = searchCitizensSlice.actions;
const { resetPagination } = paginationCitizensSlice.actions;
const syncMiddleware = store => next => action => {
    const result = next(action);
    if(action.type === setSearchQuery.type){
        store.dispatch(resetPagination());
    }
    return result;
};

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(citizensApi.middleware, syncMiddleware),
    });
};