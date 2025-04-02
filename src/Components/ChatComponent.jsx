import React, { useEffect, useState, useContext } from "react"; // Agregar useContext
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";

const ChatComponent = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { responseApiState, getRequest, postRequest } = useApiRequest(
    `${ENVIROMENT.URL_API}/api/channel/${channelId}/messages`
  );

  useEffect(() => {
    if (channelId) {
      getRequest();
    }
  }, [channelId]);
  useEffect(() => {
    if (responseApiState.data) {
      setMessages(responseApiState.data.data.messages);
    }
  }, [responseApiState]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await postRequest({ content: newMessage });
    if (!responseApiState.error) {
      setNewMessage(""); 
      getRequest();
    }
  };

  if (!channelId) {
    return <p>Crea tu primer canal</p>;
  }

  return (
    <div className="chat-panel">
      <div className="messages-list">
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.sender.username}:</strong>{" "}
            {message.content}
          </p>
        ))}
      </div>
      <form className="send-message-form" onSubmit={handleSendMessage}>
        <textarea
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit"><svg className="enviar" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8D8D8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 2L11 13"></path>
          <path d="M22 2L15 22l-4-9-9-4z"></path>
        </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;