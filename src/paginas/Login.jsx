import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'
import {FaRegEnvelope} from 'react-icons/fa'
import {MdLockOutline} from 'react-icons/md'



const Login = () => {
  
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return
    }

    try {
      const { data } = await clienteAxios.post('/profesores/login', {email, password})
      
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
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
      
      <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-[#6B728E]'>
      
      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-gradient-to-br from-indigo-700 to-purple-500 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>

          <div className='w-3/5 p-5'>

            <div className='text-left font-bold'>
              <span className='text-white'>IEEE</span> Photonics
            </div>

            <div className='pt-10'>

              <h2 className='text-3xl font-bold text-white mb-2'>
                Acceso Administrativo <span className='text-black text-4xl'>IEEE</span>
              </h2>

              <div className='border-2 w-10 border-white inline-block mb-2'></div>
              <div className='flex justify-center my-5'></div>

              <div className='flex flex-col items-center'>
                { msg && <Alerta 
                alerta={alerta}
                />}
                  <form onSubmit={handleSubmit}>

                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-5 rounded-md'>
                      <FaRegEnvelope className='text-gray-400 m-2' />
                      <input 
                        type="email"
                        placeholder="Correo Electrónico"
                        className="bg-gray-100 outline-none text-sm flex-1"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-7 rounded-md'>
                      <MdLockOutline className='text-gray-400 m-2' />
                      <input 
                        type="password"
                        placeholder="Contraseña"
                        className="bg-gray-100 outline-none text-sm flex-1"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    
                    <input type='submit' value='Iniciar Sesión'
                    className='mb-10 border-2 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:text-purple-500 hover:bg-white hover:cursor-pointer' 
                    to="/registrar"/>
                </form>
              </div>

              <div className='w-64 justify-between ml-10 mt-4 mb-3'>
                <label className='flex items-center text-sm text-white'>
                  <Link 
                    className='mr-1 hover:font-semibold'
                    to="/olvide-password">¿Olvidaste tu contraseña?</Link>
                </label>
              </div>

            </div>
          </div>

          <div className='border-2 w-1 inline-block my-10 rounded-2xl backdrop-blur-md bg-white/60'></div>

          <div className='w-2/5 text-white rounded-tr-2xl rounded-br py-36 px-12'>
            <h2 className='text-3xl font-bold mb-2'>Hola, !Bienvenido!</h2>
            <div className='border-2 w-10 border-white inline-block mb-2'></div>
            <p className='mb-10'>¿No tienes cuenta aún?, puedes crearte una</p>
            <Link className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-purple-500' 
              to="/registrar">Registrate aquí</Link>
          </div>
          
        </div>
      </main>
    </div>

    </>
  )
}

export default Login