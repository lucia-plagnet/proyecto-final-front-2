import React, { useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";
import { useParams } from 'react-router-dom';
import "../styles/CreateChannelModal.css";

const CreateChannelModal = ({ isOpen, onClose }) => {
  const [channelName, setChannelName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const { workspaceId } = useParams();
  const { responseApiState, postRequest } = useApiRequest(
    `${ENVIROMENT.URL_API}/api/channel/${workspaceId}`
  );


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName.trim()) {
      setErrorMessage("El nombre del canal es obligatorio.");
      return;
    }


    await postRequest({ name: channelName });

    if (responseApiState.error) {
      setErrorMessage(`Error: ${responseApiState.error}`);
    } else {
  
      onClose()
    }
  }

  if (!isOpen) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear un nuevo Canal</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="channelName">Nombre del Canal:</label>
          <input
            type="text"
            id="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Introduce el nombre del canal"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-actions">
            <button type="submit" disabled={responseApiState.loading}>
              {responseApiState.loading ? "Creando..." : "Crear"}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}





export default CreateChannelModal;