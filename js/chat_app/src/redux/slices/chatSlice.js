import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatServices } from '../../services/chatServices';
import { userServices } from '../../services/userServices';

const initialState = {
  chatData: {
    id: '',
    members: [],
    messages: [],
    title: ''
  },
  selectedMembers: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.selectedMembers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatByIdThunk.fulfilled, (state, action) => {
        state.chatData = action.payload;
      });
  }
});

export const addChatMembersThunk = createAsyncThunk(
  'addMembers/api/chat/:chatId/members',
  async (paramsForAddMembers, { getState }) => {
    const { authToken } = getState().auth.auth;
    const { chatId, members } = paramsForAddMembers;
    await chatServices.addChatMembers(chatId, authToken, members);
  }
);

export const createChatThunk = createAsyncThunk(
  'createChat/api/chats',
  async (paramsForCreateChat, { getState, dispatch }) => {
    const { title, authToken } = paramsForCreateChat;
    const membersId = getState().chat.selectedMembers;

    const response = await chatServices.createChat(title, authToken);

    const paramsForAddMembers = {
      chatId: response.id,
      members: membersId,
      authToken
    };

    dispatch(addChatMembersThunk(paramsForAddMembers));
  }
);

export const getChatByIdThunk = createAsyncThunk('getChatById/api/chats/:chatId', async (_, { getState }) => {
  const chatId = '9cea1435-00b1-4e86-9631-9040f0d5afc1';
  const { authToken } = getState().auth.auth;

  const response = await chatServices.getChatById(chatId, authToken);

  return response;
});

export const sendMessageByChatIdThunk = createAsyncThunk(
  'sendMessageByChatId/api/chats/:chatId',
  async (params, { getState }) => {
    const { message } = params;
    const chatId = getState().chat.chatData.id;
    const { authToken } = getState().auth.auth;
    const authorId = getState().auth.auth.user.id;

    await chatServices.sendMessageByChatId(chatId, authToken, message, authorId);
  }
);

export const getUserByIdThunk = createAsyncThunk('getUserById/api/users/:userId', async (userId, { getState }) => {
  const { authToken } = getState().auth.auth;

  const response = await userServices.getUserById(authToken, userId);

  return response;
});

export const { setMembers } = chatSlice.actions;
export default chatSlice;
