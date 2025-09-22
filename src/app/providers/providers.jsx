import { Provider } from "react-redux";
import { setupStore } from "../store";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import "dayjs/locale/ru";
import ruRu from 'antd/locale/ru_RU';

dayjs.locale("ru");

export const Providers = ({
    children,
}) => {
    return(
        <Provider store={setupStore()}>
            <ConfigProvider locale={ruRu}>
                {children}
            </ConfigProvider>
        </Provider>
    );
};