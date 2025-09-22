import { DatePicker, Form, Input, Select, Button, Card } from "antd";
import classes from "./CitizenForm.module.css"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { generateFormContent, getDatePickerData } from "../../lib/formUtils";

const { Option } = Select;

export const CitizenEducationList = () => {

    const levelOptions = [
        "СПО",
        "Бакалавриат", 
        "Специалитет",
        "Магистратура",
        "Подготовка кадров ВК"
    ].map(value=>({ value, label: <span>{value}</span> }))

    const educationLevelFormData = [
        {
            label: "Уровень образования",
            name: "level",
            dataInputComponent: Select,
            dataInputProps: {
                placeholder: "Выберите уровень образования",
                options: levelOptions,
            },
            rules:[
                { required: true, message: "Выберите уровень образования" }
            ],
        },
        {
            label: "Специальность",
            name: "specialization",
            dataInputComponent: Input,
            rules:[
                { required: true, message: "Пожалуйста, введите специальность!" },
            ]
        },
        {
            label: "Дата начала",
            name: "startDate",
            dataInputComponent: DatePicker,
            dataInputProps: {
                placeholder: "Выберите дату начала обучения",
            },
            rules:[
                { required: true, message: "Пожалуйста, введите дату начала обучения!" },
            ],
            getValueProps: getDatePickerData,
        },
        {
            label: "Дата окончания",
            name: "endDate",
            dataInputComponent: DatePicker,
            tooltip: "Пустая дата означает обучение на текущий момент",
            dataInputProps: {
                placeholder: "Выберите дату конца обучения",
            },
            getValueProps: getDatePickerData,
        },
    ];

    const generateEduLevelForm = (name, restField) => {
        const prepareFormData = educationLevelFormData.map(itemData => {
            const {
                dataInputComponent: Component,
                dataInputProps,
                ...restData
            } = itemData;
            return {
                ...restData,
                ...restField,
                name: [name, itemData.name],
                dataInput: <Component {...dataInputProps}/>
            }
        })
        return generateFormContent(prepareFormData, 1000);
    }
    return (
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    title={`Образование №${name + 1}`}
                    className={classes.eduCard}
                    extra={
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className={classes.removeEdu}
                      />
                    }
                  >
                    {generateEduLevelForm(name, restField)}
                    {/* <Form.Item
                      {...restField}
                      name={[name, "specialization"]}
                      label="Специальность"
                      rules={[{ required: true, message: "Введите специальность" }]}
                    >
                      <Input placeholder="Специальность" />
                    </Form.Item> */}
                  </Card>
                ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить образование
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
    );
};