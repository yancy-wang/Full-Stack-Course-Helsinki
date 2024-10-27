import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const [notification] = useNotification();

  if (!notification) return null;

  return <div style={{ border: '1px solid', padding: 10 }}>{notification}</div>;
};

export default Notification;
