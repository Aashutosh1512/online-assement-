import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
  },

  {
    path: '/quiz',
    element: <Quiz> </Quiz>,
  },
  {
    path: '/result',
    element: <Result></Result>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
