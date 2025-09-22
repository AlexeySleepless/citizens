/* eslint-disable no-unused-vars */
import { DatePicker, Divider, Form, Input, Select, Tabs, Typography } from "antd";
import classes from "./CitizenForm.module.css"
import { MessageOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { CitizenEducationList } from "./CitizenEducationList";
import { generateFormContent, getDatePickerData } from "../../lib/formUtils";

const { Title } = Typography

export const CitizenForm = ({initialValues, actions}) => {

    // начальные данные
    const citizenData = initialValues??{};

    // действия над формой
    const safetyActions = actions??{};

    // заполнение раздела основной страницы профиля
    const citizenInfoContentFormData = [
        {
            label: "Фамилия",
            name: "surname",
            dataInput: <Input />,
            rules:[
                { required: true, message: "Пожалуйста, введите фамилию!" },
            ]
        },
        {
            label: "Имя",
            name: "name",
            dataInput: <Input />,
            rules:[
                { required: true, message: "Пожалуйста, введите имя!" },
            ]
        },
        {
            label: "Отчество",
            name: "patronymic",
            dataInput: <Input />,
        },
        {
            label: "Дата рождения",
            name: "birthDate",
            dataInput: <DatePicker placeholder="Выберите дату рождения"/>,
            rules:[
                { required: true, message: "Пожалуйста, введите дату рождения!" },
            ],
            getValueProps: getDatePickerData,
        },
        {
            label: "Пол",
            name: "sex",
            dataInput: <Select options={
                ["Мужской","Женский", ""].map(value=>
                    ({ value, label: <span>{value?value:"Не указано"}</span> })
                )
            }/>,
        },
    ]

    // заполнение раздела контактной информации
    const contactsContentFormData = [
        {
            label: "Почта",
            name: "email",
            dataInput: <Input/>,
            rules:[
                { type: "email", message: "Формат почты некорректен" }
            ]
        },
        {
            label: "Телефон",
            name: "phoneNumber",
            dataInput: <Input/>,
            normalize: (number) => {
                const needSubString = "+";
                if(!(number&&number[0]!==needSubString[0])){
                    return number;
                }
                return needSubString + number.slice(1);
            },
            rules:[{pattern: /^\+\d{10,15}$/, message: "Некорректный номер телефона"}]
        },
    ];
    
    // данные каждого раздела
    const itemsData = [
        {
          label: "Гражданин",
          icon: UserOutlined,
          children: <>{generateFormContent (citizenInfoContentFormData, 1000)}</>,
        },
        {
          label: "Контакты",
          icon: MessageOutlined,
          children: <>{generateFormContent(contactsContentFormData, 1000)}</>,
        },
        {
          label: "Образование",
          icon: ReadOutlined,
          children: <CitizenEducationList/>,
        },
    ];

    const items = itemsData.map(({label, icon: Icon, children})=>(
        {
            key: label,
            children,
            label: (
                <div 
                    className={classes.tabContainer}
                >
                    <Icon
                        className={classes.tabIcon}
                    />
                    <span className={classes.tabLabel}>
                        {label}
                    </span>
                </div>
            ),

        }
    ));

        // управляющие формой элементы, получаемые из пропсов
    const formButtons = (
        <>
            {safetyActions.undo}
            {safetyActions.apply}
        </>
    );

    return(
        <>
            <Title level={4} className={classes.title}>Профиль</Title>
            <Divider className={classes.divider}></Divider>
            <div className={classes.title}>
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    items={items}
                />
            </div>
            <div className={classes.formButtons}>
                {formButtons}
            </div>
        </>
    );
}