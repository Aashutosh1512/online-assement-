import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './components/home.component';
import Quiz from './components/quiz.component';
import Result from './components/result.component';

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
