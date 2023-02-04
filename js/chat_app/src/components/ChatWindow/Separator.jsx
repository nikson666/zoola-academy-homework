import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useSelector } from 'react-redux';
import Image from './Image';
import usersSelectors from '../../redux/users/selector';

function Separator({ date, authorId, message }) {
  const allUsers = useSelector(usersSelectors.getAllUsers);
  const user = allUsers.find((item) => item.id === authorId);

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent>
          {message?.attachment
            ? <Image attachment={message.attachment} />
            : message.message}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent color="textSecondary">
          <Typography>{user ? user.username : null}</Typography>
          <Typography>
            {new Date(date).toLocaleDateString('en-GB', options)}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default Separator;
