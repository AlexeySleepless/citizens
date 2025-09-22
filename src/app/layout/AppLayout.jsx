import { MainLayout } from "../../shared/ui/layout";
import { BarChartOutlined, TeamOutlined } from "@ant-design/icons";
import { useOpenCitizensPage } from "../../features/openCitizensPage";
import { useOpenMainPage } from "../../features/openMainPage";
import classes from "./AppLayout.module.css";

export const AppLayout = () => {
    const navigeteToMainPage = useOpenMainPage();
    const navigetTocitizensPage = useOpenCitizensPage();


    const itemsProps = [
        {
            icon: <BarChartOutlined className={classes.icon}/>,
            label: "Главная страница",
            onClick: ()=>{navigeteToMainPage()}
        },
        {
            icon: <TeamOutlined className={classes.icon}/>,
            label: "Граждане",
            onClick: ()=>{navigetTocitizensPage()}
        },
    ];

    return(
        <MainLayout itemsProps={itemsProps}/>
    )
}