import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';

type PizzaItem = {
  id: string;
  title: string; 
  price: number; 
  imageUrl: string; 
  sizes: number[]; 
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

type Sort = {
  sortProperty: string
}

type SearchPizzasParams = {
  categoryId: number;
  sortType: Sort;
  currentPage: string;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzasParams>(
  'pizza/fetchPizzasStatus', async (params) => {
    const {categoryId, sortType, currentPage } = params
    const { data } = await axios.get<PizzaItem[]>(
      `https://6728138d270bd0b975543f8e.mockapi.io/Items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=asc`
    );

     return data;
  },
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING // loading | success | error
      state.items = []
    })
    .addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    .addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
});

export const selectPizzaData = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;