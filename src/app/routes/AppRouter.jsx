import { createBrowserRouter, RouterProvider } from "react-router";
import { getRoutes } from "./getRoutes";

export const AppRouter = () => {
    const router = createBrowserRouter(getRoutes());
    return <RouterProvider router={router}></RouterProvider>;
};