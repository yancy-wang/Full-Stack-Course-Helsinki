import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (!notification) return null;

  return <div style={{ border: '1px solid', padding: '10px' }}>{notification}</div>;
};

export default Notification;
