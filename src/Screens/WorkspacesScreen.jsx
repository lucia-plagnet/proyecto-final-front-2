import React, { useEffect, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import '../styles/WorkspacesScreen.css';
import CreateWorkspaceModal from "../Components/CreateWorkspaceModal";
import ProfileModal from "../Components/ProfileModal";

const WorkspacesScreen = () => {
    const { isAuthenticatedState, logout } = useContext(AuthContext);
    const { responseApiState, getRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/workspaces');
    const [workspaces, setWorkspaces] = useState([]);
    const [showAll, setShowAll] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const visibleWorkspaces = showAll ? workspaces : workspaces.slice(0, 1);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
    const [userData, setUserData] = useState(null);





    useEffect(() => {
        if (isAuthenticatedState) {
            getRequest();
        }
    }, [isAuthenticatedState]);

    useEffect(() => {
        if (responseApiState.data && responseApiState.data.data) {
            setWorkspaces(responseApiState.data.data.workspaces);
        }
    }, [responseApiState]);

    if (!isAuthenticatedState) {
        return <p>No estás autenticado. Por favor, inicia sesión.</p>;
    }

    if (responseApiState.loading) {
        return <p>Cargando Workspaces...</p>;
    }

    if (responseApiState.error) {
        return <p>Error: {responseApiState.error}</p>;
    }



    return (
        <div className="container">
            <div className="header">

                <img className="header-logo" src="/logo-blanco.png" alt="Logo de la aplicación" />

                <button className="profile-btn" onClick={() => setIsProfileModalOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.6569 2 15 3.343 15 5s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 8c3.866 0 7 3.134 7 7v1H5v-1c0-3.866 3.134-7 7-7z" />
                    </svg>

                </button>


            </div>

            <div className="welcome-container">
                <img src="/hand.gif" alt="Ícono de saludo" />
                <h1>¡Hola de nuevo!</h1>

            </div>

            <div className="workspaces-container">
                {workspaces.length === 0 ? (
                    <p>No tienes workspaces disponibles.</p>
                ) : (
                    <div className="workspaces-list-container">
                        <h2>Tus espacios de trabajo</h2>
                        <ul className="workspace-list">
                            {visibleWorkspaces.map(workspace => (
                                <li key={workspace._id} className="workspace-item">
                                    <div className="workspace-info">
                                        <h3>{workspace.name.toUpperCase()}</h3>
                                       <span>{workspace.members.length} miembros</span>
                                    </div>
                                    <Link to={`/workspaces/${workspace._id}`}>
                                        <button className="start-slack-btn">INICIAR SLACK</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {workspaces.length > 1 && (
                            <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
                                {showAll ? "Ver menos" : "Ver más"}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="crear-espacio-container">

                <img className="woman-icon" src="/woman.png" alt="Icono Mujer" />


                <span>¿Quieres usar Slack con otro equipo?</span>

                <button className="create-workspace-btn2" onClick={() => setIsModalOpen(true)}>
                    CREAR UN NUEVO ESPACIO DE TRABAJO
                </button>
            </div>
            <div className="login-link">
                <p>¿No encuentras tu espacio de trabajo?</p>
                <a href="/login">Prueba con otro correo electónico  </a>
            </div>
            <CreateWorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                userData={userData}
                logout={logout}
            />
        </div>

    );
};

export default WorkspacesScreen;
