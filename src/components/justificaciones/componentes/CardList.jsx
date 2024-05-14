import PropTypes from 'prop-types'
import { Card } from './Card'

export const CardList = ({cards, page}) => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-cv-secondary min-w-sm mt-5'>
                {
                    cards?.map((card, index) => (
                        <Card key={index} card={card} page={page} />
                    ))}
            </div>
        </>
    )
}

CardList.propTypes = {
    cards: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,    
}

CardList.defaultProps = {
    cards: [],
}
