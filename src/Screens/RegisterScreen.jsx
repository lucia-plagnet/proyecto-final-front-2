import React, { useState } from "react";
import ENVIROMENT from "../config/enviroment";
import { useForm } from "../hooks/useForm";
import { useApiRequest } from "../hooks/useApiRequest";
import "../styles/RegisterScreen.css";

const RegisterScreen = () => {
  const formInitialState = {
    username: "",
    email: "",
    password: "",
  };

  const { formState, handleChangeInput } = useForm(formInitialState);
  const { responseApiState, postRequest } = useApiRequest(
    ENVIROMENT.URL_API + "/api/auth/register"
  );

  const [formErrors, setFormErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

 
  const validateForm = (formData) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.username || formData.username.length < 3) {
      errors.username = "El nombre de usuario debe tener al menos 3 caracteres.";
    }
    if (!formData.email || !emailPattern.test(formData.email)) {
      errors.email = "Por favor ingresa un correo electrónico válido.";
    }
    if (!formData.password) {
      errors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 8) {
      errors.password = "Debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Debe incluir al menos una mayúscula.";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Debe incluir al menos una minúscula.";
    } else if (!/\d/.test(formData.password)) {
      errors.password = "Debe incluir al menos un número.";
    }

    return errors;
  };

  
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const errors = validateForm(formState);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      await postRequest(formState);
      setIsRegistered(true); 
    }
  };

  return (
    <div className="register-container">
         <img src="/logo.png" alt="Logo de la aplicación" />
      <h1 className="register-title">Primero, introduce tu correo <br /> electrónico</h1>
      <span>Te sugerimos que uses la direccion de correo electronico que usas en el trabajo</span>

      {isRegistered ? (
        <div>
          <p>
            Consulta en tu correo electronico si te ha llegado un correo de
            confirmacion para activar tu cuenta. 
          </p>
          <p>
            <a href="/login" className="login-link">Inicia sesión aquí</a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmitForm} className="register-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input
              placeholder="username"
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChangeInput}
              className="form-input"
            />
            {formErrors.username && <span className="error-message">{formErrors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              placeholder="nombre@work-email.com"
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChangeInput}
              className="form-input"
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              placeholder="Example_password123"
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChangeInput}
              className="form-input"
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>

          {responseApiState.error && <span className="error-message">{responseApiState.error}</span>}

          {responseApiState.loading ? (
            <span className="loading-message">Cargando...</span>
          ) : (
            <button type="submit" className="submit-button">Registrar</button>
          )}
        </form>
      )}

      {!isRegistered && (
        <div className="login-redirect">
          <p>¿Ya usas Slack?</p>
          <a href="/login">Conectarse a un espacio de trabajo actual</a>
        </div>
      )}
    </div>
  );
};

export default RegisterScreen;
