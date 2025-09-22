import { createSlice } from "@reduxjs/toolkit";
import { pageSizes } from "./consts";

const initialState = {
    page: 1,
    size: pageSizes[0],
    itemCount: 0,
}

export const paginationCitizensSlice = createSlice(
    {
        name: "paginationCitizens",
        initialState,
        reducers: {
            setPage(state, action){
                state.page = action.payload;
            },
            setItemCount(state, action){
                state.itemCount = action.payload;
            },
            setSize(state, action){
                state.size = action.payload;
            },
            resetPagination(state){
                state.page = 1;
                state.size = pageSizes[0];
            }
        }
    }
);

export const paginationCitizensReducer = paginationCitizensSlice.reducer;