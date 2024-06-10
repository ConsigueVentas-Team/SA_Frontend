export const filterByJustificationType = (data, buscador_tipoJustificacion)=>{
    return data.filter((post) => {
      if (buscador_tipoJustificacion === '') {
        return true
      } 
      else if(buscador_tipoJustificacion === 'Tardanza'){                            
        return post.justification_type === true
      }
      else if(buscador_tipoJustificacion === 'Falta'){                                     
        return post.justification_type === false
      }            
    })
  }

export const filterByJustificationStatus = (data, buscadorStatus)=>{
    return data.filter((post) => {
        const justificationTypeArray = Array.isArray(
            post.justification_status
        )
            ? post.justification_status
            : [post.justification_status]

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
            // Valor de búsqueda inválido, no se muestra ningún card
            return false 
        }
    })
}

export const filterByJustificationDate = (data, buscadorFecha)=>{
    return data.filter((post) => {
        if (buscadorFecha === '') {
            return true
        } else if (buscadorFecha !== '') {
            const fechaPost = post.justification_date
            const fechaBuscador = buscadorFecha
            return fechaPost === fechaBuscador
        }
    })    
}

export const filterBySearch = (data, name)=>{
    return data.filter((post) => {
        if (
            post.user.name
                .toUpperCase()
                .includes(name.toUpperCase())
        ) {
            return true
        }

        return false
    })        
}