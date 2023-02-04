import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useSelector } from 'react-redux';
import chatSelectors from '../../redux/chat/selector';
import Separator from './Separator';

function ListOfChats() {
  const chatData = useSelector(chatSelectors.getChatData);
  const arrayOfMessages = chatData?.messages;

  if (arrayOfMessages?.length) {
    return (
      <List
        sx={{
          display: 'flex',
          jastifyContent: 'center',
          flexDirection: 'column-reverse',
          alignItems: 'center'
        }}
      >
        {arrayOfMessages.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index}>
            <Separator message={message} date={message.date} authorId={message.authorId} />
          </ListItem>
        ))}
      </List>
    );
  }
  return null;
}

export default ListOfChats;
