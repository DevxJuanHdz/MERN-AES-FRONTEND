import { useState, useEffect } from 'react'
import Alerta from '../components/Alerta'
import useEstudiantes from '../hooks/useEstudiantes'

const Formulario = () => {

  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ nua, setNua ] = useState('')
  const [ actividad, setActividad ] = useState('')
  const [ horas, setHoras ] = useState('')
  const [ fecha, setFecha ] = useState('')
  const [ observaciones, setObservaciones ] = useState('')
  const [id, setId] = useState(null)

  const [ alerta, setAlerta ] = useState({})

  const { guardarEstudiante, estudiante } = useEstudiantes()
  
  useEffect(() => {
    if(estudiante?.nombre){
      setNombre(estudiante.nombre)
      setEmail(estudiante.email)
      setNua(estudiante.nua)
      setActividad(estudiante.actividad)
      setHoras(estudiante.horas)
      setFecha(estudiante.fecha)
      setObservaciones(estudiante.observaciones)
      setId(estudiante._id)
    }
  }, [estudiante])

  const handleSubmit =  e => {
    e.preventDefault()

    //Validar el formulario
    if([nombre, email, nua, actividad, horas, fecha, observaciones].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      }) 
      return
    }

    let emailReGex = new RegExp(/^[a-zA-Z0-9._-]+@+((ugto.mx)|(ieee.org))+$/);
    if(!(emailReGex.test(email))){
      setAlerta({
        msg: 'Este dominio no es aceptado',
        error: true
      })
      return
    }

    if(nua.length !== 6 ){
      setAlerta({
        msg: 'El NUA tiene que ser de 6 digitos',
        error: true
      })
      return
    }
      guardarEstudiante({nombre, email, nua, actividad, horas, fecha, observaciones, id})
      setAlerta({
        msg: 'Guardado Correctamente'
      })
      setNombre('')
      setEmail('')
      setNua('')
      setActividad('')
      setHoras('')
      setFecha('')
      setObservaciones('')
  }

  const { msg } = alerta
  return (
    <>
      <h2 className='font-black text-3xl text-center'>Registro de Estudiantes</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando estudiantes en este apartado de {''} 
            <span className='text-[#001253] font-bold'>
              registro
            </span>
      </p>
      
      <form
        className="bg-[#65647C] py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label 
            htmlFor="nombre"
            className="text-gray-900 uppercase font-bold"
          >Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del estudiante"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-900 uppercase font-bold"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@ugto.mx"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="nua"
            className="text-gray-900 uppercase font-bold"
          >nua</label>
          <input
            id="nua"
            type="text"
            placeholder="NUA del Estudiante"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={nua}
            onChange={e => setNua(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="actividad"
            className="text-gray-900 uppercase font-bold"
          >Actividad</label>
          <select
            id="actividad"
            type="text"
            placeholder="Actividad a Desempeñar"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={actividad}
            onChange={e => setActividad(e.target.value)}
          >
          <option>Sin Asignar</option>
          <option>Servicio Social 1er Componente</option>
          <option>Servicio Social 2do Componente</option>
          </select>
        </div>

        <div className="mb-5">
          <label 
            htmlFor="horas"
            className="text-gray-900 uppercase font-bold"
          >Horas a destinar</label>
          <input
            id="horas"
            type="text"
            placeholder="Horas destinadas a la actividad"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={horas}
            onChange={e => setHoras(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="fecha"
            className="text-gray-900 uppercase font-bold"
          >Fecha de Alta</label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="observaciones"
            className="text-gray-900 uppercase font-bold"
          >Observaciones</label>
          <textarea
            id="observaciones"
            placeholder="Notas sobre el estudiante"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="bg-[#001253] w-full p-3 text-white uppercase font-bold hover:bg-[#1334a8] cursor-pointer transition-colors rounded-md"
          value={ id ? 'Guardar Cambios': 'Agregar Pacientes'}
        />

      </form>
      {msg && <Alerta
          alerta={alerta}/>
        }
    </>
  )
}

export default Formulario