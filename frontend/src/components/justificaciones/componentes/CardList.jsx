import PropTypes from 'prop-types'
import { Card } from './Card'

export const CardList = ({
    cards,
    page,
    buscador_tipoJustificacion,
    buscadorStatus,
    buscadorFecha,
    searchName,
}) => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-cv-secondary min-w-sm mt-5'>
                {cards
                    .filter((post) => {
                        const justificationTypeArray = Array.isArray(post.type)
                            ? post.type
                            : [post.type]
                        if (buscador_tipoJustificacion === '') {
                            // Si no se ha seleccionado ningún tipo de justificación, se muestran todos los cards
                            return true
                        } else {
                            // Filtrar por el tipo de justificación seleccionado
                            return justificationTypeArray.includes(
                                Number(buscador_tipoJustificacion)
                            )
                        }
                    })
                    .filter((post) => {
                        const justificationTypeArray = Array.isArray(
                            post.status
                        )
                            ? post.status
                            : [post.status]

                        if (buscadorStatus === '') {
                            // Si no se ha seleccionado ningún tipo de justificación, se muestran todos los cards
                            return true
                        } else if (buscadorStatus === '3') {
                            // Filtrar por "En proceso"
                            return justificationTypeArray.includes(3)
                        } else if (buscadorStatus === '1') {
                            // Filtrar por "Aceptado"
                            return justificationTypeArray.includes(1)
                        } else if (buscadorStatus === '2') {
                            // Filtrar por "Rechazado"
                            return justificationTypeArray.includes(2)
                        } else {
                            return false // Valor de búsqueda inválido, no se muestra ningún card
                        }
                    })
                    .filter((post) => {
                        if (buscadorFecha === '') {
                            return true
                        } else if (buscadorFecha !== '') {
                            const fechaPost = post.justification_date
                            const fechaBuscador = buscadorFecha
                            return fechaPost === fechaBuscador
                        }
                    })
                    .filter((post) => {
                        if (
                            post.user.name
                                .toUpperCase()
                                .includes(searchName.toUpperCase())
                        ) {
                            return true
                        }

                        return false
                    })
                    .map((card, index) => (
                        <Card key={index} card={card} page={page} />
                    ))}
            </div>
        </>
    )
}

CardList.propTypes = {
    cards: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    buscador_tipoJustificacion: PropTypes.string.isRequired,
    buscadorStatus: PropTypes.string.isRequired,
    buscadorFecha: PropTypes.string.isRequired,
    searchName: PropTypes.string,
}

CardList.defaultProps = {
    cards: [],
}
