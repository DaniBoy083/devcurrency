/*
  Componente raiz da aplicação
  Fornece o roteador (router) para toda a aplicação
*/

import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

/**
 * App é o componente principal que envolve toda a aplicação
 * Usa RouterProvider para habilitar roteamento em todo o app
 */
export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
