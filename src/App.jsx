import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import AdministrarEstudiantes from './paginas/AdministrarEstudiantes'
import EditarPerfil from './paginas/EditarPerfil'
import { CambiarPassword } from './paginas/CambiarPassword'


import { AuthProvider } from './context/AuthProvider'
import { EstudiantesProvider } from './context/EstudiantesProvider'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
        <EstudiantesProvider>
          <Routes>
            //Cuando el usuario visite ("/") cargara el element
              <Route path='/' element={ <AuthLayout />}>
                  <Route index element={ <Login />} />
                  <Route path='registrar' element={ <Registrar/> } />
                  <Route path='olvide-password' element={ <OlvidePassword /> } />
                  <Route path='olvide-password/:token' element={ <NuevoPassword /> } />
                  <Route path='confirmar/:id' element={ <ConfirmarCuenta /> } />
              </Route>

              <Route path="/admin" element={<RutaProtegida/>}>
                <Route index element={<AdministrarEstudiantes/>} />
                <Route path="perfil" element={<EditarPerfil/>} />
                <Route path="cambiar-password" element={<CambiarPassword/>} />
              </Route>

          </Routes>
        </EstudiantesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
