import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App";
import Home from "../pages/home.tsx";
import Paint from "../pages/paint.tsx";


const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/Paint",
                element: <Paint />
            },
        ],
    },
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
    ReactDOM.createRoot(rootElement).render(
        <RouterProvider router={router} />
    );
}