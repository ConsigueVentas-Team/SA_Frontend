
import { useState} from "react";
import UserList from './UserList';

// Componente principal
export default function BasicTable() {

  // Estado
  const [filters, setFilters] = useState({
    name: '',
    shift: '',
    department: '',
    core: '',
    position: '',
  }); 
  // Renderizado del componente
  return (
    <UserList filters={filters} userId={null} />
  )
}