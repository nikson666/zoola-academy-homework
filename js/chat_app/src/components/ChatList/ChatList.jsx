import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getChatByIdThunk, getUsersChatsThunk } from '../../redux/chat/slice';
import chatSelectors from '../../redux/chat/selector';

function ChatList() {
  const [selectedIndex, setSelectedIndex] = useState();
  const dispatch = useDispatch();
  const chatsList = useSelector(chatSelectors.getChatList);

  useEffect(() => {
    dispatch(getUsersChatsThunk());
  }, []);

  const onSelectChat = (index, chatId) => {
    dispatch(getChatByIdThunk(chatId));
    setSelectedIndex(index);
  };

  return (
    <Box sx={{
      width: '100%', maxWidth: 360, bgcolor: 'background.paper'
    }}
    >
      <List
        component="nav"
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 400,
          '& ul': {
            padding: 0
          },
        }}
      >
        {chatsList?.map((chat, index) => (
          <ListItemButton
            selected={selectedIndex === index}
            key={chat.id}
            onClick={() => onSelectChat(index, chat.id)}
          >
            <ListItemText primary={chat.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default ChatList;
