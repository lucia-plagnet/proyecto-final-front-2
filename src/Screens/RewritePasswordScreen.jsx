import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/RewritePasswordScreen.css'

const RewritePasswordScreen = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reset_token = searchParams.get('reset_token');

    
    useEffect(() => {
        if (!reset_token) {
            navigate('/login');
        }
    }, [reset_token, navigate]);

    const initialFormState = { password: '' };
    const { formState, handleChangeInput } = useForm(initialFormState);
    const { responseApiState, putRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/rewrite-password');

    const [error, setError] = useState("");

    useEffect(() => {
        if (responseApiState.data) {
            navigate('/login');
        }
    }, [responseApiState, navigate]);

   
    const validateForm = (formData) => {
        if (!formData.password) return "La contraseña es obligatoria.";
        if (formData.password.length < 8) return "Debe tener al menos 8 caracteres.";
        if (!/[A-Z]/.test(formData.password)) return "Debe incluir al menos una mayúscula.";
        if (!/[a-z]/.test(formData.password)) return "Debe incluir al menos una minúscula.";
        if (!/\d/.test(formData.password)) return "Debe incluir al menos un número.";
        return null;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const validationError = validateForm(formState);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(""); 
        await putRequest({ password: formState.password, reset_token });
    };

    return (
        <div className="content">
            <img src="/logo.png" alt="Logo de la aplicación" />
            <h1 className="recuperar">Establecer nueva contraseña</h1>
            <form onSubmit={handleSubmitForm}>
                <div className="password">
                    <label htmlFor="password">Introduce tu nueva contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Nueva contraseña"
                        value={formState.password}
                        onChange={handleChangeInput}
                    />
                </div>

                {error && <span style={{ color: 'red' }}>{error}</span>}

                {responseApiState.error && <span style={{ color: 'red' }}>{responseApiState.error}</span>}
                {responseApiState.loading ? (
                    <span>Cargando...</span>
                ) : responseApiState.data ? (
                    <span>Solicitud enviada. Inicia sesión con tu nueva contraseña.</span>
                ) : (
                    <button type="submit">CREAR NUEVA CONTRASEÑA</button>
                )}
            </form>
        </div>
    );
};

export default RewritePasswordScreen;
