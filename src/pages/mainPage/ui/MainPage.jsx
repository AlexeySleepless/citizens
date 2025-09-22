import { Flex, Card, Statistic, Typography } from 'antd';
import { citizensApi } from '../../../entities/citizen';
import { Bar, Line, Pie } from '@ant-design/charts';
import { TeamOutlined } from '@ant-design/icons';
import classes from "./MainPage.module.css";
import { GlobalSpin } from "../../../shared/ui/globalSpin";

const { Title } = Typography;

export const MainPage = () => {
    const { data = {}, isLoading } = citizensApi.useFetchStatsQuery("",{
        pollingInterval: 10000
    });
    const { count = 0, ageStat = [], eduLevelStat = [], contactStat = [] } = data;

    const ageStatConfig = {
        data: ageStat,
        xField: "age",
        yField: "count",
        shapeField: 'smooth',
        height: 350,
        axis: {
            y: { title: "Количество"},
            x: { title: "Возраст" },
        },
        tooltip: {
            title: ()=>"Количестов граждан",
            items: [{ field: 'count', name:" "}],

        }
    };

    const eduLevelConfig = {
        data: eduLevelStat,
        xField: "level",
        yField: "count",
        colorField: 'level',
        height: 350,
        axis: {
            y: { title: "Количество граждан"},
            x: { labelFormatter: () => "" }
        },
        tooltip: {
            title: ()=>"Количестов граждан",
            items: [{ field: 'count', name:" "}],

        }
    };

    const contactStatConfig = {
        data: contactStat,
        colorField: "category",
        angleField: "count",
        radius: 1,
        height: 350,
        tooltip: {
            title: ()=>"Количестов граждан",
            items: [{ field: 'count', name:" "}],
        }
    };
    const stats = [
        {
            title: "Возраст граждан",
            element: <Line {...ageStatConfig}/>
        },
        {
            title: "Количество граждан с уровнями образования",
            element: <Bar {...eduLevelConfig}/>
        },
        {
            title: "Заполненная контактная информация",
            element: <Pie {...contactStatConfig}/>
        },
    ]
    const statistic = isLoading?(
        <>
            <GlobalSpin/>
        </>
    ):(
        <>
            <div className={classes.gridContainer}>
                {stats.map(({title, element})=>
                    <Card key={title}>
                        <Title level={4}>{title}</Title>
                        {element}
                    </Card>
                )}
            </div>
        </>
    )
    return(
        <Flex className={classes.container}>
            <Card>
                <Statistic
                    title="Количество граждан"
                    value={count}
                    loading={isLoading}
                    prefix={<TeamOutlined/>}
                />
            </Card>
            {statistic}
        </Flex>
    );
}