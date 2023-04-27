
import '../styles/App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

//import components 
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';
import Graph from './Graph';


/**react routes */
const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>
  },

  {
    path:'/quiz',
    element:<CheckUserExist><Quiz> </Quiz></CheckUserExist>
  },
  {
    path:'/result',
    element:<CheckUserExist><Result></Result></CheckUserExist>
  },
  {
    path:'/user',
    exact:true,
    element:<Graph/>

  }
   
])
function App() {
  return (
   <>
    <RouterProvider router={router}></RouterProvider>
   </>
  );
}

export default App;
