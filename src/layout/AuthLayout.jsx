import { Outlet } from 'react-router-dom'
//Este Auth Layout servira para mostrar el formulario de inicio de sesion
const AuthLayout = () => {
  return (
    <>
      
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout