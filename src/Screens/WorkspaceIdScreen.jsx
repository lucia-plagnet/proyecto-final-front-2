import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";
import "../styles/WorkspaceIdScreen.css";
import CreateChannelModal from "../Components/CreateChannelModal";
import ChatComponent from "../Components/ChatComponent";
import ProfileModal from "../Components/ProfileModal";
const WorkspaceIdScreen = () => {
  const { workspaceId } = useParams();
  const { isAuthenticatedState, logout } = useContext(AuthContext);

  const [selectedChannel, setSelectedChannel] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelsModal, setChannelsModals] = useState([]); 
  (AuthContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const { responseApiState: workspaceState, getRequest: getWorkspace } = useApiRequest(
    `${ENVIROMENT.URL_API}/api/workspaces/${workspaceId}`
  );
  const { responseApiState: channelsState, getRequest: getChannels } = useApiRequest(
    `${ENVIROMENT.URL_API}/api/workspaces/${workspaceId}/channels`
  );

  
  useEffect(() => {
    if (isAuthenticatedState) {
      getWorkspace();
      getChannels();
    }
  }, [isAuthenticatedState, workspaceId]);

 
  useEffect(() => {
    if (channelsState.data?.data?.length > 0) {
      setSelectedChannel(channelsState.data.data[0]._id); 
    } else if (channelsState.data?.data?.length === 0) {
      setIsModalOpen(true); 
    }
  }, [channelsState]);

  const addChannel = (newChannel) => {
    setChannelsModals((prevChannels) => [...prevChannels, newChannel]);
    setSelectedChannel(newChannel._id); 
    setIsModalOpen(false);
  };

  
  if (!isAuthenticatedState) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  if (workspaceState.loading || channelsState.loading) {
    return <p>Cargando datos...</p>;
  }

  if (workspaceState.error || channelsState.error) {
    return <p>Error: {workspaceState.error || channelsState.error}</p>;
  }

  
  const workspace = workspaceState.data?.data;
  const channels = channelsState.data?.data || [];
  const members = workspace?.members || [];

  return (
    <div className="workspace-details-container">
      <div className="workspace-content">
        <div className="channels-section">
          <div className="channels-header">
            <h1>{workspace?.name.toUpperCase()}</h1>
            <button className="profile-btn" onClick={() => setIsProfileModalOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.6569 2 15 3.343 15 5s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 8c3.866 0 7 3.134 7 7v1H5v-1c0-3.866 3.134-7 7-7z" />
              </svg>

            </button>
            <button className="create-channel-btn" onClick={() => setIsModalOpen(true)}>+</button>
          </div>

          <ul>
            <h2>▾ Canales</h2>
            {channels.map((channel) => (
              <li
                key={channel._id}
                className={selectedChannel === channel._id ? "active-channel" : ""}
                onClick={() => setSelectedChannel(channel._id)}
              >
                # {channel.name}
              </li>
            ))}
          </ul>

          <div className="members-section">
            <h2>▾ Miembros</h2>
            <ul>
              {members.map((member) => (
                <li key={member._id || member}>#{member.username || `ID: ${member}`}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="messages-section">
          <h2># {channels.find((channel) => channel._id === selectedChannel)?.name || "Sin canal seleccionado"}</h2>
          {selectedChannel ? (
            <ChatComponent channelId={selectedChannel} />
          ) : (
            <p>Cargando chat...</p>
          )}
        </div>


        <CreateChannelModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          workspaceId={workspaceId}
          onChannelCreated={addChannel}
        />
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userData={userData}
          logout={logout}
        />
      </div>
    </div>
  );
};

export default WorkspaceIdScreen;