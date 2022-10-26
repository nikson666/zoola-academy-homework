import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userServices } from '../../services/userServices';

const initialState = {
  allUsers: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
  }
});

export const getAllUsersThunk = createAsyncThunk('getAllUsers/api/users', async (_, { getState }) => {
  const { authToken } = getState().auth.auth;

  const response = await userServices.getAllUsers(authToken);
  return response;
});

export const createUserThunk = createAsyncThunk(
  'createUser/api/users',
  async (paramsForCreateUser, { dispatch, getState }) => {
    const { authToken, adminId } = getState().auth.auth;
    const { username, password } = paramsForCreateUser;

    await userServices.createUser(authToken, username, password, adminId);

    dispatch(getAllUsersThunk(authToken));
  }
);

export default usersSlice;
