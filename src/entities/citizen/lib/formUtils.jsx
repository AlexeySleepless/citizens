import { Form } from "antd";
import dayjs from "dayjs";
import { toPresent } from "../api/consts";

export function getDatePickerData(input){
    if(input === toPresent){
        input = "";
    }
    return {
        value: input && dayjs(input) 
    }
}

export const generateFormContent = (formItemData, validateDebounce) => {
    return formItemData.map(({dataInput, ...props})=>
        <Form.Item {...props} key = {props.name} validateDebounce={validateDebounce}>
            {dataInput}
        </Form.Item>
    )
}

export const citizenDateFormat = (citizen) => {
    const birthDateKey = "birthDate";
    const eduKey = "education";
    citizen[birthDateKey] = getStringValue(citizen[birthDateKey]);
    if(eduKey in citizen){
        const start = "startDate";
        const end = "endDate"
        for(const edu of citizen[eduKey]){
            edu[start] = getStringValue(edu[start]);
            edu[end] = getStringValue(edu[end]);
            if(!edu[end]){
                edu[end] = toPresent;
            }
        }
    }
}

function getStringValue(input){
    if(typeof input === "string"){
        return input;
    }
    const output =  input?.format?.();
    return output??"";
}