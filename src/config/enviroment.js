//forma de llamar variable de entorno de env, en vit, importante usar siempre vite antes de dar nombre (VITE_URL_API) caso contrario no responde
const ENVIROMENT = {
    URL_API : import.meta.env.VITE_URL_API
}
export default ENVIROMENT