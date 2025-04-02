import { useState } from "react";
import ServerError from "../utils/error.util";

export const useApiRequest = (url) => {
    const initialResponseApiState = {
        loading: false,
        error: null,
        data: null,
    };

    const [responseApiState, setResponseApiState] = useState(initialResponseApiState);

    const sendRequest = async (method, body = null) => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true });

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('authorization_token')}`,
            };

            const config = {
                method,
                headers,
            };

            if (body) {
                config.body = JSON.stringify(body);
            }

            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new ServerError(data.message || 'Error desconocido', response.status);
            }

            setResponseApiState({ loading: false, data, error: null });
        } catch (error) {
            setResponseApiState({ loading: false, data: null, error: error.message || 'Error en la solicitud' });
        }
    };

    return {
        responseApiState,
        postRequest: (body) => sendRequest('POST', body),
        putRequest: (body) => sendRequest('PUT', body),
        getRequest: () => sendRequest('GET'),
    };
};