import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";
import { DetailPage } from "./pages/detail";
import { NotFoundPage } from "./pages/notfound";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/detail/:cripto",
                element: <DetailPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

export {router};