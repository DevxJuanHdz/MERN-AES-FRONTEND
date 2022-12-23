import useEstudiantes from "../hooks/useEstudiantes"

const Estudiante = ({estudiante}) => {
  const { setEdicion, eliminarEstudiante } = useEstudiantes()

  const { email, fecha, nombre, actividad, horas, nua, observaciones, _id} = estudiante


  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-MX',{dateStyle: 'long'}).format(nuevaFecha)
  }
  
  

  return (
    <div className="mx-5 my-10 bg-[#65647C] shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-[#001253] my-2">Nombre: {''} 
        <span className="font-semibold normal-case text-black ">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-[#001253] my-2">Email de contacto: {''} 
        <span className="font-semibold normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase text-[#001253] my-2">nua: {''} 
        <span className="font-semibold normal-case text-black">{nua}</span>
      </p>
      <p className="font-bold uppercase text-[#001253] my-2">actividad: {''} 
        <span className="font-semibold normal-case text-black">{actividad}</span>
      </p>
      <p className="font-bold uppercase text-[#001253] my-2">horas a destinar: {''} 
        <span className="font-semibold normal-case text-black">{horas}</span>
      </p>
      <p className="font-bold uppercase text-[#001253] my-2">fecha: {''} 
        <span className="font-semibold normal-case text-black">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold uppercase text-[#001253] my-2">Observaciones: {''} 
        <span className="font-semibold normal-case text-black">{observaciones}</span>
      </p>

      <div className="flex justify-between my-5">
        <button 
        type="button"
        className="py-2 px-10 bg-[#001253] hover:bg-[#1334a8] text-white uppercase  font-bold rounded-lg"
        onClick={() => setEdicion(estudiante)} 
        >Editar</button>
        <button 
        type="button"
        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase  font-bold rounded-lg"
        onClick={() => eliminarEstudiante(_id)}
        >Eliminar</button>

      </div>

    </div>
  )
}

export default Estudiante