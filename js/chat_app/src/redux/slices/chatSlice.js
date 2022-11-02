import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatServices } from '../../services/chatServices';

const initialState = {
  chatData: null,
  selectedMembers: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedMembers: (state, action) => {
      state.selectedMembers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChatByIdThunk.fulfilled, (state, action) => {
      state.chatData = action.payload;
    });
  }
});

export const addChatMembersThunk = createAsyncThunk(
  'addMembers/api/chat/:chatId/members',
  async (paramsForAddMembers, { getState }) => {
    const { authToken } = getState().auth.auth;
    const { chatId, members } = paramsForAddMembers;
    return chatServices.addChatMembers(chatId, authToken, members);
  }
);

export const createChatThunk = createAsyncThunk('createChat/api/chats', async (title, { getState, dispatch }) => {
  const { authToken } = getState().auth.auth;
  const membersId = getState().chat.selectedMembers;

  const response = await chatServices.createChat(title, authToken);

  const paramsForAddMembers = {
    chatId: response.id,
    members: membersId,
    authToken
  };

  dispatch(addChatMembersThunk(paramsForAddMembers));
});

export const getChatByIdThunk = createAsyncThunk(
  'getChatById/api/chats/:chatId',
  async (chatId, { getState }) => {
    const { authToken } = getState().auth.auth;
    const response = await chatServices.getChatById(chatId, authToken);

    return response;
  }
);

export const { setSelectedMembers } = chatSlice.actions;
export default chatSlice;
