import {RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import router from './routes/routes'
import "./styles/global.scss"
import { useState } from 'react';

import { AuthProvider } from './components/CRUDComponents/authProvider/AuthProvider';

function App(){
    const [authData,setAuthData] = useState();
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
}

export default App