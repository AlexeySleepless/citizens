import { Navigate } from "react-router";

export const addNavigateToFirst = (routes) => {
    if (!routes?.length) {
        return;
    }
    const rootPath = routes[0].path;
    if (!rootPath) {
        return;
    }
    const navigateToRoot = {
        path: `*`,
        element: <Navigate to={rootPath} />,
    };
    routes.push(navigateToRoot);
};