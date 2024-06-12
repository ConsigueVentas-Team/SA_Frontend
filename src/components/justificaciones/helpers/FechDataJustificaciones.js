import { AES, enc } from 'crypto-js'

export const FechDataJustificaciones = async ({ page, exclude, name='' }) => {
    try {
        const tokenD = AES.decrypt(
            localStorage.getItem('token'),
            import.meta.env.VITE_TOKEN_KEY
        )

        const token = tokenD.toString(enc.Utf8)
        const iduser = localStorage.getItem('iduser')

        let url;

        if(exclude) {
            url = `${import.meta.env.VITE_API_URL}/justification/list?page=${page}&exclude_user=${iduser}&name=${name}`;
        }else {            
            url = `${import.meta.env.VITE_API_URL}/justification/list?page=${page}&user=${iduser}`;
        }
            
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await response.json()
        return data
    } catch (error) {
        // Manejo de errores en caso de fallo en la llamada a la API
        console.error('Error al obtener los datos de la API:', error)
        return error
    }
}
