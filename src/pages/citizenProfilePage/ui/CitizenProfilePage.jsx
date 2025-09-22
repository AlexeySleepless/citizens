import { Link, useParams } from "react-router";
import { citizenDateFormat, CitizenForm, citizensApi } from "../../../entities/citizen";
import classes from "./CitizenProfilePage.module.css";
import { Button, Form, message, Spin, Typography } from "antd";
import { routeConsts } from "../../../shared/config";
import { useOpenCitizensPage } from "../../../features/openCitizensPage";
import { ProcessButton } from "../../../shared/ui/processButton";
import { GlobalSpin } from "../../../shared/ui/globalSpin";

const { citizenIdName, citizensPath } = routeConsts;

const { Title } = Typography

export const CitizenProfilePage = () => {
    const params = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const citizenId = Number(params[citizenIdName]);
    const returnToList = useOpenCitizensPage();

    // запрос данных гражданина
    const { 
        data, 
        isLoading: isLoadingCitizens, 
        error: errorLoadingCitizen
    } = citizensApi.useFetchCitizenQuery(citizenId);

    // получение функции изменения данных гражданина
    const [
        updateFn, 
        {
            isLoading: isLoadingUpdate
        }
    ] = citizensApi.useUpdateCitizenMutation();

    if(isLoadingCitizens){
        return <GlobalSpin/>
    }

    if(errorLoadingCitizen){
        return(
            <div className={classes.error}>
                <Title level={4} type="danger" className={classes.errorMessage}>
                    Не удалось найти указанного гражданина
                </Title>
                <Link to={`/${citizensPath}`}>Вернуться к списку граждан</Link>
            </div>
        );
    }

    const undo = <Button onClick={returnToList}>Отмена</Button>;

    const apply = (
        <ProcessButton
            type="primary"
            htmlType="submit"
            isLoading={isLoadingUpdate}
        >
            Сохранить
        </ProcessButton>
    )

    const finishHandler = async (data) => {
        citizenDateFormat(data);
        try{
            await updateFn({...data, id: citizenId}).unwrap();
            returnToList();
            return;
        }catch{
            messageApi.open({
                type: 'error',
                content: 'Не удадось выполнить редактирование',
            });
        }
    }

    const finishFailHandler = () => {
        messageApi.open({
            type: 'error',
            content: 'Некоторые изменения некорректны',
        });
    }


    return(
        <Form
            onFinish={finishHandler}
            onFinishFailed={finishFailHandler}
            initialValues={data}
            layout="vertical"
            autoComplete="on"
        >
            {contextHolder}
            <CitizenForm initialValues={data} actions={{undo, apply}}/>
        </Form>
    );
}