
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
  return (
    <UserList filters={filters} />
  )
}