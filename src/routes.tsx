/*
  Arquivo de configuração de rotas
  Define todas as rotas da aplicação e a estrutura do layout
*/

import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";
import { DetailPage } from "./pages/detail";
import { NotFoundPage } from "./pages/notfound";
import { Layout } from "./components/layout";

// Criação do roteador com as rotas da aplicação
const router = createBrowserRouter([
    {
        // Layout envolve todas as páginas filhas
        element: <Layout />,
        children: [
            {
                // Rota para página inicial
                path: "/",
                element: <HomePage />
            },
            {
                // Rota dinâmica para página de detalhe da criptomoeda
                // :cripto é um parâmetro que pode ser o ID ou nome da moeda
                path: "/detail/:cripto",
                element: <DetailPage />
            },
            {
                // Rota coringa para página 404 (qualquer rota não definida)
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

export {router};