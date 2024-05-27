import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const MessageNotFound = ({message='No se encontraron resultados'}) => {
    return (
        <div className="w-full gap-7 text-lg py-20 flex flex-col items-center text-center">
            <SearchIcon className='scale-150' fontSize='large'/>
            <span>{message}</span>
        </div>
    );
};

export default MessageNotFound;