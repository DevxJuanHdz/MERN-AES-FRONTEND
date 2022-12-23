import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import {FaRegEnvelope} from 'react-icons/fa'

const OlvidePassword = () => {

  const [ email, setEmail ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    //Validacion si hay un string vacio
    if(email === '' || email.length < 6  ) {
      setAlerta({ msg: '¡El correo es obligatorio!', error: true})
      return
    }
    try {
      const { data } = await clienteAxios.post('/profesores/olvide-password', {email})
      setAlerta({
        msg: data.msg
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div className='h-screen relative bg-gradient-to-br from-indigo-700 to-purple-500 overflow-hidden'>
      <div className='absolute bg-gradient-to-br h-full rounded-full bg-white/30 blur-2xl circle-left'></div>
      <div className='absolute bg-gradient-to-br h-full rounded-full bg-white/30 blur-2xl circle-right'></div>

      <div className='absolute w-96 h-96 backdrop-blur-sm bg-white/30 rounded-full z-9 top-1/2 right-1/2'></div>
      <div className='absolute w-72 h-72 backdrop-blur-sm bg-white/30 rounded-full z-9 bottom-1/2 left-1/2'></div>
      <div className='absolute w-16 h-16 backdrop-blur-sm bg-white/30 rounded-full z-9 inset-y-2/4 inset-x-3/4'></div>
      
      <div className='absolute w-96 h-96 backdrop-blur-sm bg-white/30 rounded-full z-9 top-1/2 right-1/2'></div>

      <div className='absolute top-8 w-full h-screen backdrop-blur-sm bg-gradient-to-br to-purple-500/30 from-indigo-700/40'></div>
    </div>

    <div className='w-11/12 md:w-3/6 2xl:w-2/6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl bg-white/30 rounded-lg md:p-20 p-10'>

      <FaRegEnvelope className='mb-5 text-white w-10 h-10' />
      <h1 className='text-white font-semibold text-3xl mb-2'>
        Recuperación de Acceso
      </h1>
      <p className='text-white text-xl mb-5 w-3/4'>
        Le enviaremos instrucciones
      </p>

      { msg && <Alerta 
      alerta={alerta}
      />}
      <form onSubmit={handleSubmit} className='flex items-center relative'>
        <input 
          type="email" 
          placeholder='Su correo electrónico...'
          className='placeholder:text-gray-200 text-white outline-none focus:border-2 focus:border-purple-500 active:border-purple-500 w-full form-input px-4 py-3 rounded-md bg-transparent border border-white/30'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="submit"
          value="Enviar"
          className='font-semibold rounded-md px-5 absolute right-0 h-full text-white bg-gradient-to-br to-purple-500 from-indigo-700 hover:cursor-pointer'
        />
      </form>

      <div className='flex justify-between mt-10'>
        <Link 
          className='flex items-center text-sm text-white hover:font-semibold'
          to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
        <Link 
          className='flex items-center text-sm text-white hover:font-semibold'
          to="/registrar">¿No tienes una cuenta? Registrate</Link>
      </div>

    </div>
    </>
  )
}

export default OlvidePassword