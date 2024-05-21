import { AES, enc } from 'crypto-js';

const getTokens = () => {
    const tokenD = AES.decrypt(
        localStorage.getItem('token'),
        import.meta.env.VITE_TOKEN_KEY
    )
    const token = tokenD.toString(enc.Utf8);

    return {token};
};

export default getTokens;