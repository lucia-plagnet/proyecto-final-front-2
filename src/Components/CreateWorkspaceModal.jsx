import React, { useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";
import "../styles/CreateWorkspaceScreen.css";

const CreateWorkspaceModal = ({ isOpen, onClose }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { responseApiState, postRequest } = useApiRequest(
    `${ENVIROMENT.URL_API}/api/workspaces`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workspaceName.trim()) {
      setErrorMessage("El nombre del workspace es obligatorio.");
      return;
    }

    await postRequest({ name: workspaceName });

    if (responseApiState.error) {
      setErrorMessage(`Error: ${responseApiState.error}`);
    } else {
     
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear un nuevo Workspace</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="workspaceName">Nombre del Workspace:</label>
          <input
            type="text"
            id="workspaceName"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Introduce el nombre del workspace"
          />
        
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-actions">
            <button type="submit" disabled={responseApiState.loading}>
              {responseApiState.loading ? "Creando..." : "Crear"}
            </button>
            <button  type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;