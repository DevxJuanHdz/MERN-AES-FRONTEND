import useEstudiantes from '../hooks/useEstudiantes'
import Estudiante from './Estudiante'

const ListadoEstudiantes = () => {
  
  const { estudiantes } = useEstudiantes()
  //console.log(estudiantes)

  return (
    <>
      { estudiantes.length ? 
      (
        <>
          <h2 className='font-black text-3xl text-center'>Listado de Estudiantes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Administracion de  {''} 
            <span className='text-[#001253] font-bold'>
              estudiantes IEEE-AES
            </span>
          </p>

          {estudiantes.map(estudiante => (
            <Estudiante
              key={estudiante._id}
              estudiante={estudiante}
            />
          ))}

        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No hay registros de estudiantes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando estudiantes a este apartado de {''} 
            <span className='text-blue-600 font-bold'>
              registros
            </span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoEstudiantes