import {RouterProvider} from 'react-router-dom'

import "./styles/global.scss"
import router from './routes/routes'

function App(){
    return (
      <RouterProvider router={router} />
    );
}

export default App