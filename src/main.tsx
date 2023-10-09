import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Home } from './components/Pages/Home';
import { Admin } from './components/Pages/admin/Admin';
import { IngridientPanel } from './components/Pages/admin/IngridientPanel';
import { PizzaForm } from './components/Pages/admin/PizzaForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
    children: [
      {
        path: "ingridient",
        element: <IngridientPanel/>
      },
      {
        path: "pizza",
        element: <PizzaForm/>
      },
  ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
