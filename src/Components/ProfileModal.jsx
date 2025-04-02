import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";

const ProfileModal = ({ isOpen, onClose }) => {
  const { isAuthenticatedState, logout } = useContext(AuthContext);
  const { responseApiState, getRequest } = useApiRequest(ENVIROMENT.URL_API + "/api/auth/profile");
  const [userData, setUserData] = useState(null);

 
  useEffect(() => {
    if (isOpen && isAuthenticatedState) {
      getRequest();
    }
  }, [isOpen, isAuthenticatedState]);

 
  useEffect(() => {
    if (responseApiState.data) {
      setUserData(responseApiState.data.data);
    }
  }, [responseApiState]);

  if (!isOpen) return null;

  if (responseApiState.loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (responseApiState.error) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Error: {responseApiState.error}</p>
          <button onClick={onClose} className="close-btn">Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Mi Perfil</h2>
        <div className="profile-info">
          <p><strong>Usuario:</strong> {userData?.username || "No disponible"}</p>
          <p><strong>Email:</strong> {userData?.email || "No disponible"}</p>
        </div>
        <div className="modal-actions">
          <button onClick={logout} className="logout-btn">Cerrar sesión</button>
          <button onClick={onClose} className="close-btn">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;