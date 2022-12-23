import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const EstudiantesContext = createContext()

export const EstudiantesProvider = ({children}) => {

  const { auth } = useAuth();

  const [ estudiantes, setEstudiantes ] = useState([])
  const [ estudiante, setEstudiante ] = useState({})

  useEffect(() => {
    const obtenerEstudiantes = async () => {
        try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }

          const { data } = await clienteAxios('/estudiantes', config)
          setEstudiantes(data);

        } catch (error) {
          console.log(error)
        }
    }
    obtenerEstudiantes()
  }, [auth])

  const guardarEstudiante = async (estudiante) => {

    console.log(estudiante)

    const token = localStorage.getItem('token')
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

    if(estudiante.id) {
      try {
        const {data} = await clienteAxios.put(`/estudiantes/${estudiante.id}`, estudiante, config)
        const estudianteActualizado = estudiantes.map( estudianteState => estudianteState._id === data._id ? data : estudianteState)
        setEstudiantes(estudianteActualizado);
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        
        const { data } = await clienteAxios.post('/estudiantes', estudiante, config)
        const { createdAt, updatedAt, __v, ...estudianteAlmacenado} = data
        setEstudiantes([estudianteAlmacenado, ...estudiantes])
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }

  }

  const setEdicion = (estudiante) => {
    setEstudiante(estudiante)
  }

  //Funcion para generar un mixin para la alerta de eliminar estudiante
  const toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'Titulo',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  

  const eliminarEstudiante = async (id) => {
    //const confirmar = confirm('¿Confirmas que deseas eliminar?')
    const confirmar = await Swal.fire({
      title: '¿Estas seguro de eliminar el paciente?',
      text: "!No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
      }).then((result) => {
      if (result.isConfirmed) {
          return true;
      } else {
          return false;
      }
  })

    if(confirmar) {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios.delete(`/estudiantes/${id}`, config)

        const estudiantesActualizado = estudiantes.filter( estudianteState => estudianteState._id !== id)
        setEstudiantes(estudiantesActualizado)
        toastMixin.fire({
          animation: true,
          title: 'Eliminado correctamente'
        });
      } catch (error) {
        console.log(error)
      }
    }
  }



  return(
    <EstudiantesContext.Provider
      value={{
        estudiantes,
        guardarEstudiante, 
        setEdicion,
        estudiante,
        eliminarEstudiante
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  )
}

export default EstudiantesContext
