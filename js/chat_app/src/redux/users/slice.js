import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userServices } from '../../services/userServices';
import authSelectors from '../auth/selector';

const initialState = {
  allUsers: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
  }
});

export const getAllUsersThunk = createAsyncThunk('getAllUsers/api/users', async (_, { getState, rejectWithValue }) => {
  try {
    const authToken = authSelectors.getAuthToken(getState());

    return userServices.getAllUsers(authToken);
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response.data);
  }
});

export const createUserThunk = createAsyncThunk(
  'createUser/api/users',
  async (paramsForCreateUser, { dispatch, getState, rejectWithValue }) => {
    try {
      const authToken = authSelectors.getAuthToken(getState());
      const id = authSelectors.getAuthUserId(getState());
      const { username, password } = paramsForCreateUser;

      await userServices.createUser(authToken, username, password, id);

      dispatch(getAllUsersThunk());
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export default usersSlice;
