import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import qs from 'qs';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { parseDate } from '../../utils/formatTime';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  goals: [],
  goalGroups: [],
  goal: null,
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
  name: 'goal',
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

    // GET GOALS
    getGoalsSuccess(state, action) {
      state.isLoading = false;
      state.goals = action.payload;
    },

    // GET GOAL GROUPS
    getGoalGroupsSuccess(state, action) {
      state.isLoading = false;
      state.goalGroups = action.payload;
    },

    // GET GOAL
    getGoalSuccess(state, action) {
      state.isLoading = false;
      state.goal = action.payload;
      console.log('success')
    },

    //  SORT & FILTER goals
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((cartItem) => cartItem.price * cartItem.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = state.checkout.cart.map((goal) => {
          const isExisted = goal.id === product.id;
          if (isExisted) {
            return {
              ...goal,
              quantity: goal.quantity + 1
            };
          }
          return goal;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  sortByProducts
} = slice.actions;

// ----------------------------------------------------------------------

export function getGoals(pageNumber, pageSize) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/goal/getGoals', {
        pageNumber,
        pageSize
      });
      dispatch(slice.actions.getGoalsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getGoal(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/goal/getGoal', {
        params: { id }
      });
      dispatch(slice.actions.getGoalSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getGoalGroups() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/goal/getGoalGroups');
      dispatch(slice.actions.getGoalGroupsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function deleteGoal(id) {
  try {
    if (Array.isArray(id)) {
      await axios.delete('/api/goal/deleteAll', {
        params: { id: id },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });
    } else {
      await axios.delete('/api/goal/delete', { params: { id } });
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function addGoal(data, isEdit) {
  let id = isEdit ? data.id : null
  let title = data.title
  let finishTitle = data.finishTitle
  let description = data.description
  let status = data.status;
  let goalGroup = data.goalGroup
  let endDate = data.endDate ? parseDate(data.endDate) : null
  let stages = data.stages
  console.log(data)
  await axios.post('/api/goal/saveGoal', {
    id,
    title,
    finishTitle,
    description,
    status,
    goalGroup,
    endDate,
    stages
  });
}