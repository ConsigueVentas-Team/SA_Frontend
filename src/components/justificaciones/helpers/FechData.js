import { AES, enc } from 'crypto-js'

export const FechData = async ({ page }) => {

    try {
        const tokenD = AES.decrypt(
            localStorage.getItem('token'),
            import.meta.env.VITE_TOKEN_KEY
        )
        const token = tokenD.toString(enc.Utf8)
        
        const turno = localStorage.getItem('shift')
        const user_id = localStorage.getItem('iduser')

        let url = `${import.meta.env.VITE_API_URL}/justification/list?page=${page}&shift=${turno}&user=${user_id}`

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        
        const data = await response.json()        

        return data
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error)
        return error
    }
}
