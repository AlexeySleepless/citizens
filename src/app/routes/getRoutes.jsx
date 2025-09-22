import { CitizenProfilePage } from "../../pages/citizenProfilePage";
import { CitizensPage } from "../../pages/citizensPage";
import { MainPage } from "../../pages/mainPage";
import { routeConsts } from "../../shared/config";
import { addNavigateToFirst } from "../../shared/lib/routeUtils";
import { AppLayout } from "../layout";


const { citizensPath, citizenIdName } = routeConsts;

export const getRoutes = () => {
    const routes = [
        {
            path: "/",
            element: <AppLayout/>,
            children: [
                {
                    index: true,
                    element: <MainPage/>,
                },
                {
                    path: `/${citizensPath}`,
                    element: <CitizensPage/>,
                },
                {
                    path: `/${citizensPath}/:${citizenIdName}`,
                    element: <CitizenProfilePage/>,
                },
            ],
        },
    ];
    addNavigateToFirst(routes);
    return routes;
};