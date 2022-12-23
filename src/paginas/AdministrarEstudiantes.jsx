import { useState } from 'react'
import Formulario from "../components/Formulario"
import ListadoEstudiantes from "../components/ListadoEstudiantes"

const AdministrarEstudiantes = () => {

  const [ mostrarFormulario, setMostrarFormulario ] = useState(false)
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className='bg-blue-600 text-white font-bold uppercase mx-10 py-3 rounded-md mb-10 md:hidden'
        onClick={() => setMostrarFormulario(!mostrarFormulario) }
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>
      <div className={` ${mostrarFormulario ? 'block' : 'hidden' } md:block  md:w-1/2 lg:w-2/5`}>
        <Formulario/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoEstudiantes/>
      </div>
    </div>
  )
}

export default AdministrarEstudiantes