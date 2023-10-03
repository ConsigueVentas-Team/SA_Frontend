import ListaNota from "./ListaNota";
import { useState } from "react";

function Nota() {

    // Estado
    const [filters, setFilters] = useState({
        id: '',
        date: '',
        user_id: '',
        evaluation_type: '',
        created_at: '',
        updated_at: '',
    });
    return (
        <div>
            <ListaNota filters={filters} />
        </div>
    );
}

export default Nota;
