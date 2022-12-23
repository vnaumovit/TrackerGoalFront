import { createSlice } from '@reduxjs/toolkit';
import qs from 'qs';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  habits: [],
  habit: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: ''
  },
};

const slice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET HABITS
    getGoalsSuccess(state, action) {
      state.isLoading = false;
      state.habits = action.payload;
    },

    // GET HABIT
    getGoalSuccess(state, action) {
      state.isLoading = false;
      state.habit = action.payload;
      console.log('success')
    },

    //  SORT & FILTER habits
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getHabits(pageNumber, pageSize) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/habit/getAllThisWeek', {
        params: { pageNumber, pageSize }
      });
      dispatch(slice.actions.getGoalsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export async function saveHabit(data) {
  const id = data.id
  const name = data.name
  let response = await axios.post('/api/habit/saveHabit', {
    id,
    name
  });
  return response.data;
}

// ----------------------------------------------------------------------

export async function updateHabitDays(data) {
  let response = await axios.post('/api/habit/updateHabitDays', data);
  console.log(response)
  return response.data;
}

// ----------------------------------------------------------------------

export async function deleteHabit(id) {
  try {
    if (Array.isArray(id)) {
      await axios.delete('/api/habit/deleteAll', {
        params: { id: id },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });
    } else {
      await axios.delete('/api/habit/delete', { params: { id } });
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}