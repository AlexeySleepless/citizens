import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchQuery: ""
}

export const searchCitizensSlice = createSlice(
    {
        name: "searchCitizens",
        initialState,
        reducers: {
            setSearchQuery(state, action){
                state.searchQuery = action.payload.trim();
            }
        }
    }
);

export const searchCitizensReducer = searchCitizensSlice.reducer;