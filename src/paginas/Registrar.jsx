import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

const Registrar = () => {

  //Se define un state por cada uno de los campos del registro
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')

  const [ alerta, setAlerta ] = useState({})


  const handleSubmit = async e => {
    e.preventDefault();

    //Validaciones para el formulario
    if([ nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg: '¡Hay campos vacios!', error: true});
      return;
    }
    
    //Validacion del password
    if( password !== repetirPassword ) {
      setAlerta({msg: '¡Las constraseñas no son iguales!', error: true});
      return;
    }

    //Validacion del la longitud del password
    if(password.length < 6 ) {
      setAlerta({msg: '¡La constraseña es muy corta, usar minimo 6 caracteres!', error: true});
      return;
    }
    //Si todas las validaciones son correctas se desaparece la alerta
    setAlerta({})

    //Creando el usuario en la API usando axios para comunicacion con el BK
    try {
      await clienteAxios.post('/profesores', { nombre, email, password })
      setAlerta({
        msg: 'Usuario creado correctamente, revisa tu email',
        error: false
      })
    } catch (error) {
      //De esta manera accedemos a las validaciones desde el backen y mostrarlas en el front
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div className='antialiased bg-[#6B728E]'>

        <div className='flex w-full min-h-screen justify-center items-center'>
          <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-gradient-to-br from-indigo-700 to-purple-500 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white sm:p-12 overflow-hidden'>

            <div className='flex flex-col justify-between'>
              <div>
                <h1 className='font-bold text-4xl tracking-wide'>Registro Administrativo <span className='text-black'>IEEE</span></h1>
              </div>
              <div>
                <p className='pt-2 text-cyan-100 text-xl'>
                  Bienvenido a la plataforma web del <span className='font-semibold'>AES-IEEE</span>.
                </p> 
                <p>
                  Por favor ingrese sus datos para crearle una cuenta de usuario.
                </p>
              </div>
              <div className='flex text-white justify-between text-lg'>
                <Link 
                  className='flex items-center text-sm hover:font-semibold'
                  to="/">¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link 
                  className='flex items-center text-sm hover:font-semibold z-10'
                  to="/olvide-password">¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div className='relative'>

              <div className='absolute z-0 w-40 h-40 backdrop-blur-sm bg-white/30 rounded-full -right-28 -top-28'></div>
              <div className='absolute z-0 w-40 h-40 backdrop-blur-sm bg-white/30 rounded-full -left-28 -bottom-16'></div>

              <div className='relative z-10 bg-white md:w-90 rounded-xl shadow-lg p-8 text-gray-600'>

                { msg && <Alerta 
                  alerta={alerta}
                />}
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>

                  <div>
                    <label className='text-sm font-semibold'>Nombre</label>
                    <input className='mt-2 ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500' 
                      type="text" 
                      placeholder='Su nombre'
                      value={nombre}
                      onChange={ e => setNombre(e.target.value) }/>
                  </div>

                  <div>
                    <label className='text-sm font-semibold'>Correo Electrónico</label>
                    <input className='mt-2 ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500' 
                      type="email" 
                      placeholder='Correo electrónico'
                      value={email}
                      onChange={ e => setEmail(e.target.value) }/>
                  </div>

                  <div>
                    <label className='text-sm font-semibold'>Contraseña</label>
                    <input className='mt-2 ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500' 
                      type="password" 
                      placeholder='Su contraseña'
                      value={password}
                      onChange={ e => setPassword(e.target.value) }/>
                  </div>

                  <div>
                    <label className='text-sm font-semibold'>Confirmar contraseña</label>
                    <input className='mt-2 ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500' 
                      type="password" 
                      placeholder='Repita su contraseña'
                      value={repetirPassword}
                      onChange={ e => setRepetirPassword(e.target.value) }/>
                  </div>

                  <input 
                    type="submit"
                    value="Registrar Cuenta"
                    className='inline-block self-end bg-gradient-to-br from-indigo-700 to-purple-500 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm hover:cursor-pointer'
                  />

                </form>

              </div>
            </div>

          </div>
        </div>

        </div>
    </>
  )
}

export default Registrar