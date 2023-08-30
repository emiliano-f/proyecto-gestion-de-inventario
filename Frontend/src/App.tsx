import {RouterProvider} from 'react-router-dom'
import router from './components/routes/routes'

function App(){
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
}

export default App