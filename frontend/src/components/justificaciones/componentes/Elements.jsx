import PropTypes from 'prop-types'

export const SearchBar = ({ value, onChange }) => {
    return (
        <>
            <div className='relative flex w-full flex-wrap items-stretch'>
                <input
                    type='text'
                    value={value}
                    onChange={onChange}
                    className='relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-md border border-solid border-cv-primary bg-transparent bg-clip-padding p-2 text-base font-normal leading-relaxed text-cv-cyan outline-none transition duration-200 ease-in-out'
                    placeholder='Buscar por nombre o apellido'
                />
            </div>
        </>
    )
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}
