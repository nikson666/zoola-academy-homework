import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatSelectors from '../../redux/chat/selector';
import { getChatByIdThunk, sendMessageByChatIdThunk } from '../../redux/chat/slice';
import ListOfChats from './ListOfChats';
import UploadBtn from './UploadBtn';

function ChatWindow() {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const chatId = useSelector(chatSelectors.getChatId);

  useEffect(() => {
    if (chatId) {
      const updateChat = setInterval(() => {
        dispatch(getChatByIdThunk(chatId));
      }, 2000);
      return () => {
        clearInterval(updateChat);
      };
    }
  });

  const handleMessage = (e) => {
    const textMessage = e.target.value;

    setMessage(textMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      message
    };

    dispatch(sendMessageByChatIdThunk(params));
    setMessage('');
  };

  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate autoComplete="off">
      <Input fullWidth onChange={(e) => handleMessage(e)} value={message} placeholder="Enter your message" />
      <UploadBtn
        sx={{
          cursor: 'pointer'
        }}
      />
      <ListOfChats />
    </Box>
  );
}

export default ChatWindow;
