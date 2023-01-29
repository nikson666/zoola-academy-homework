import React, { useState, useEffect, useMemo } from 'react';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersThunk } from '../../redux/users/slice';
import MemberAvatar from './MemberAvatar';
import MemberList from './MemberList';
import chatSelectors from '../../redux/chat/selector';
import usersSelectors from '../../redux/users/selector';

export default function ChatMembersListModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const membersIds = useSelector(chatSelectors.getMembers);
  const allUsers = useSelector(usersSelectors.getAllUsers);

  const membersData = useMemo(() => allUsers?.filter((user) => membersIds?.includes(user.id)), [membersIds, allUsers]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  const handleClickOpen = () => {
    dispatch(getAllUsersThunk());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AvatarGroup
        sx={{
          cursor: 'pointer'
        }}
        onClick={handleClickOpen}
        max={5}
      >
        {membersData?.map((user) => (
          <MemberAvatar key={user.id} username={user.username} />
        ))}
      </AvatarGroup>
      <MemberList open={open} onClose={handleClose} membersData={membersData} allUsers={allUsers} />
    </div>
  );
}
