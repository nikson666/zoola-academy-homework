import { query } from './utils/utils';

export const chatServices = {
  createChat: async (title, authToken) => {
    const body = {
      title
    };
    const response = await query('/api/chats', 'POST', authToken, body);
    return response;
  },
  addChatMembers: async (chatId, authToken, members) => {
    const body = {
      members
    };
    return query(`/api/chats/${chatId}/members`, 'POST', authToken, body);
  },
  getChatById: async (chatId, authToken) => {
    const response = await query(`/api/chats/${chatId}`, 'GET', authToken);
    return response;
  },
  getUserChats: async (userId, authToken) => {
    const response = await query(`/api/users/${userId}/chats`, 'GET', authToken);
    return response;
  },
  sendMessageByChatId: async (chatId, authToken, message, authorId) => {
    const body = {
      authorId,
      message
    };
    return query(`/api/chats/${chatId}/messages`, 'POST', authToken, body);
  }
};
