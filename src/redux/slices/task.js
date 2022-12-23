import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  tasks: [],
  task: null
};

const slice = createSlice({
  name: 'task',
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

    // GET TASKS
    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.tasks = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTasks(pageNumber, pageSize) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/task/getAll', {
        pageNumber,
        pageSize
      });
      dispatch(slice.actions.getTasksSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export async function saveTask(data) {
  let id = data.id
  let name = data.name
  let isDone = data.isDone
  return await axios.post('/api/task/saveTask', {
    id,
    isDone,
    name
  });
}

// ----------------------------------------------------------------------

export async function updateStatusTask(task) {
  let id = task.id
  let isDone = task.isDone;
  console.log(isDone)
  await axios.post('/api/task/updateStatusTask', {
    id,
    isDone
  });
}

// ----------------------------------------------------------------------

export async function deleteTask(id) {
  try {
    await axios.delete('/api/task/delete', { params: { id } });
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}
