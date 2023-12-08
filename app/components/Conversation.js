const Conversation = ({ conversation }) => {
  return conversation.map((item) => {
    return (
      <div key={item.id} className="smile">
        <div>{item.name}</div>
        <div>{item.body}</div>
        <div>{item.email}</div>
      </div>
    );
  });
};

export default Conversation;
