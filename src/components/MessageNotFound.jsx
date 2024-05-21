import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const MessageNotFound = () => {
    return (
        <div className="w-full gap-7 text-lg py-20 flex flex-col items-center text-center">
            <SearchIcon className='scale-150' fontSize='large'/>
            <span>No se encontraron resultados</span>
        </div>
    );
};

export default MessageNotFound;