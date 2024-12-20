const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`note ${messageType === "success" ? "success" : "error"}`}>
      {message}
    </div>
  );
};

export default Notification;
