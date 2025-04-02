import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import '../styles/LoginScreen.css';



const LoginScreen = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialFormState = {
        email: "",
        password: "",
    };

    const { formState, handleChangeInput } = useForm(initialFormState);
    const { responseApiState, postRequest } = useApiRequest(
        ENVIROMENT.URL_API + "/api/auth/login"
    );

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (responseApiState.data) {
            login(responseApiState.data.data.authorization_token);
            navigate("/workspaces");
        }
    }, [responseApiState, login, navigate]);

    const validateForm = (formData) => {
        const errors = {};
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!formData.email || !emailPattern.test(formData.email)) {
            errors.email = "Por favor ingresa un correo electrónico válido.";
        }
        if (!formData.password || formData.password.length < 8) {
            errors.password = "La contraseña debe tener al menos 8 caracteres.";
        }

        return errors;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const errors = validateForm(formState);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            await postRequest(formState);
        }
    };

   
    return (
        
        
        <div className="login-container">
            <img src="/logo.png" alt="Logo de la aplicación" />


            <h1>Conectarse a Slack</h1>
            <span>Te sugerimos que uses la dirección de correo electrónico que usas en el trabajo.</span>
           
            <form className="form" onSubmit={handleSubmitForm}>
                <div className="input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nombre@work-email.com"
                        value={formState.email}
                        onChange={handleChangeInput}
                        required
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        value={formState.password}
                        onChange={handleChangeInput}
                        required
                    />
                    {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                     <Link to="/reset-password" className="forgot-password-link">¿Olvidaste tu contraseña?</Link>
                </div>

                {responseApiState.error && <span className="error-message">{responseApiState.error}</span>}

                {responseApiState.loading
                    ? <button className="login-btn" disabled>Cargando...</button>
                    : <button className="login-btn">Iniciar sesión</button>
                }
               

            </form>
            <div className="register-box">
                <p>¿Nuevo en Slack?</p>
                 <Link className='register-link' to="/register">Crear una cuenta</Link>
            </div>

        </div>
    );
};

export default LoginScreen;
