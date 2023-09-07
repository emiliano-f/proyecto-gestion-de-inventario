import {RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import router from './routes/routes'
import "./styles/global.scss"


//

function App(){
    return (
      <RouterProvider router={router} />
    );
}

export default App