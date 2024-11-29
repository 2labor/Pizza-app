import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Sort = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price';
}

export interface FilterSliceState {
  searchValue: string;
  pagination: number;
  categoryId: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  pagination: 1,
  categoryId: 0,
  sort: {
    name: 'популярности', 
    sortProperty: 'rating'
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pagination = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>){
      state.sort = action.payload.sort
      state.pagination = Number(action.payload.pagination)
      state.categoryId = Number(action.payload.categoryId)
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;