import { AES, enc } from 'crypto-js'

export const FechData = async () => {
    try {
        // Realiza la llamada a tu API para obtener los datos de la base de datos
        const tokenD = AES.decrypt(
            localStorage.getItem('token'),
            import.meta.env.VITE_TOKEN_KEY
        )
        const token = tokenD.toString(enc.Utf8)
        const response = await fetch(
            import.meta.env.VITE_API_URL + '/justification/list',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = await response.json()

        // Actualiza el estado "cards" con los datos recibidos de la API
        // const justifications = data.Justificaciones
        // console.log(data)
        return data
    } catch (error) {
        // Manejo de errores en caso de fallo en la llamada a la API
        console.error('Error al obtener los datos de la API:', error)
        return error
    }
}
