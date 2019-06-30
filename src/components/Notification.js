import React from "react";

const Notification = ({ notification }) => {
  if (!notification.message) return null;
  return (
    <div className={`notification-${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
