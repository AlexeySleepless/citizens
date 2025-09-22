import { Divider, Flex, Table, Typography } from "antd";
import { citizensApi } from "../../../entities/citizen";
import { PaginationCitizens } from "../../../features/paginationCitizens";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { routeConsts } from "../../../shared/config";
import { useObviousLoading } from "../lib/useObviousLoading";
import { GlobalSpin } from "../../../shared/ui/globalSpin";
import classes from "./CitizensPage.module.css";
import { SearchCitizens } from "../../../features/searchCitizens";

const { citizensPath } = routeConsts;

const { Title } = Typography

export const CitizensPage = () => {

    const { page, size} = useSelector( state => state.paginationCitizensReducer );
    const searchQuery = useSelector( state => state.searchCitizensReducer.searchQuery );

    const queryParams = {
        page,
        limit: size,
        searchQuery
    }
    const { 
        data = {}, 
        isLoading, 
        isFetching,
    } = citizensApi.useFetchCitizensQuery(queryParams,{
        pollingInterval: 10000
    });

    const { fragment = [], count = 0 } = data;

    const triggersObviousLoading = [page, size, searchQuery];
    const [obviousLoading] = useObviousLoading(isFetching, triggersObviousLoading);

    const columnsData = [
        {
            title: "Фамилия",
            property: "surname",
        },
        {
            title: "Имя",
            property: "name",
        },
        {
            title: "Отчество",
            property: "patronymic",
        },
        {
            title: "Почта",
            property: "email",
        },
        {
            title: "Дата рождения",
            property: "birthDate",
        },
        {
            title: "Пол",
            property: "sex",
        },
        {
            title: "Уровень образования",
            property: "educationStatus",
        },

    ];
    
    
    const columns = columnsData.map(({title, property})=>({
            title,
            dataIndex: property,
            key: property,
    }))

    const navigate = useNavigate();
    const onRowHandler = (record) => {
        return {
            onClick: () => {
                navigate(`/${citizensPath}/${record.id}`);
            }
        }
    }

    if(isLoading){
        return <GlobalSpin/>;
    }

    return(
        <>
            <SearchCitizens/>
            <Flex>
                <div className={classes.dividerBlock}><Divider/></div>
                <Title 
                    level={5}
                    className={classes.count}
                >
                    {`Количество граждан - ${count}`}
                </Title>
                <div className={classes.dividerBlock}><Divider/></div>
            </Flex>
            <Table
                dataSource={fragment}
                columns={columns}
                scroll={{x:"max-content"}}
                rowKey={"id"}
                pagination = {false}
                loading = {obviousLoading}
                onRow={onRowHandler}
            />
            <PaginationCitizens total={count}/>
        </>
    );
}