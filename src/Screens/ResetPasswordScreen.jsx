import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import { Link } from 'react-router-dom'
import '../styles/ResetPasswordScreen.css'

const ResetPasswordScreen = () => {
    const initialFormState = {
        email: ''
    }

    const { formState, handleChangeInput } = useForm(initialFormState)
    const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/reset-password')

    const [emailError, setEmailError] = useState('')

    const handleSubmitForm = async (e) => {
        e.preventDefault()

       
        if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) {
            setEmailError('Por favor ingresa un correo electrónico válido.')
            return
        }

        setEmailError('')
        await postRequest(formState)
    }

    return (
        <div className="content">
            <img src="/logo.png" alt="Logo de la aplicación" />
            {responseApiState.data ? (
               
                <>
                    <span className='correo-enviado'>Se te ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.</span>
                    <div class="redirect-box1">
                        <a href="/login">Inicia sesión aquí</a>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="recuperar">Restablece tu contraseña</h1>
                    <form onSubmit={handleSubmitForm}>
                        <div className="mail">
                            <label htmlFor="email">Email registrado</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="nombre@work-email.com"
                                value={formState.email}
                                onChange={handleChangeInput}
                                required
                            />
                            {emailError && <span className="error-message">{emailError}</span>}
                        </div>

                        {responseApiState.error && <span className="error-message">{responseApiState.error}</span>}

                        {responseApiState.loading ? (
                            <button type="submit" className="reset-btn">cargando</button>
                        ) : (
                            <button type="submit" className="reset-btn">RESTABLECER CONTRASEÑA</button>
                        )}

                        <div className="redirect-box">
                            <span>¿Nuevo en Slack?</span>
                            <a href="/register">Crear una cuenta</a>
                            <span>o</span>
                            <a href="/login">Inicia sesion aquí</a>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

export default ResetPasswordScreen
