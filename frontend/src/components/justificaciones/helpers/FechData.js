import { AES, enc } from 'crypto-js'

export const FechData = async ({ page }) => {
    let url = ''
    try {
        const tokenD = AES.decrypt(
            localStorage.getItem('token'),
            import.meta.env.VITE_TOKEN_KEY
        )
        const token = tokenD.toString(enc.Utf8)

        const rol = localStorage.getItem('rol')
        const turno = localStorage.getItem('shift')
        const user_id = localStorage.getItem('iduser')

        if (rol === 'Colaborador') {
            url = `${
                import.meta.env.VITE_API_URL
            }/justification/list?page=${page}&shift=${turno}&user=${user_id}`
        } else if (rol === 'Lider Nucleo' || rol === 'Gerencia') {
            url = `${
                import.meta.env.VITE_API_URL
            }/justification/list?page=${page}&shift=${turno}&user=${user_id}`
        }

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()

        console.log(data.Justifications)
        return data.Justifications
    } catch (error) {
        // Manejo de errores en caso de fallo en la llamada a la API
        console.error('Error al obtener los datos de la API:', error)
        return error
    }
}
