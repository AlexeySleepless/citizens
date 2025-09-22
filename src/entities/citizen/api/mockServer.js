import dayjs from "dayjs";
import { toPresent } from "./consts";
import { citizens, eduParity } from "./mockData";

function delay(ms){
    return new Promise(res => {
        setTimeout(() => {
            res();
        }, ms);
    });
}

function getCitizensBySearch(searchQuery){
    if(!searchQuery){
        return citizens;
    }
    const rawWords = searchQuery.toLowerCase().split(" ");
    const words = rawWords.filter(word=>word.length);
    const checkKeys = [
        "surname",
        "name",
        "patronymic",
        "email",
        "sex",
        "phoneNumber",
        "birthDate",
        "educationStatus"
    ]
    const result = []
    citizens.forEach(citizen=>{
        let count = 0;
        for(const word of words){
            for(const key of checkKeys){
                if(citizen[key].toLowerCase().includes(word)){
                    count++;
                }
                if(count === words.length){
                    result.push(citizen);
                    return;
                }
            }
        }
    });
    return result;
}
function getAgeStatistic(){
    const storage = {};
    let minAge = 1000;
    let maxAge = -1;
    const data = [];
    for(const citizen of citizens){
        const date = dayjs(citizen.birthDate);
        const now = dayjs();
        const age = now.diff(date, "year");

        if(age in storage){
            storage[age]++;
        }else{
            storage[age] = 1;
        }

        if(age < minAge){
            minAge = age;
        }

        if(age > maxAge){
            maxAge = age;
        }
    }

    for(let i = minAge; i <= maxAge; i++){
        const age = i;
        const needCount = storage[age];
        const count = needCount??0;
        data.push({age, count})
    }
    return data;
}

function getEduLevelStatistic(){
    const storage = {};
    for(const citizen of citizens){
        const level = citizen.educationStatus;

        if(level in storage){
            storage[level]++;
        }else{
            storage[level] = 1;
        }
    }
    const entries = Object.entries(storage);
    return entries.map(([level, count])=>({ level, count }));
}

function getContactStatisctic(){
    const storage = {};
    const contactsKeys = ["email", "phoneNumber"]
    for(const citizen of citizens){
        let count = 0;
        for(const key of contactsKeys){
            if(citizen[key]){
                count++;
            }
        }
        let status = "Есть некоторые контакты";
        if(count === contactsKeys.length){
            status = "Есть все контакты";
        }

        if(!count){
            status = "Нет контактов";
        }

        if(status in storage){
            storage[status]++;
        }else{
            storage[status] = 1;
        }
    }
    const entries = Object.entries(storage);
    return entries.map(([category, count])=>({ category, count }));
}


export async function getStatistic(){
    await delay(1000);
    const count = citizens.length;
    const ageStat = getAgeStatistic();
    const eduLevelStat = getEduLevelStatistic();
    const contactStat = getContactStatisctic();
    return { count, ageStat, eduLevelStat, contactStat}
}

export async function getCitizens(queryParams){
    const { page, limit, searchQuery } = queryParams;
    await delay(1000);
    const searchCitizens = getCitizensBySearch(searchQuery);
    const startPosition = (page - 1) * limit;
    const endPosition = startPosition + limit;
    const count = searchCitizens.length;
    const fragment = searchCitizens.slice(startPosition, endPosition);
    return {fragment, count};
}

export async function getCitizen(id){
    await delay(1000);
    const citizen = citizens.find(item => item.id === id);
    if(citizen){
        return citizen;
    }
    throw new Error("Не удалось найти пользователя");
}

export async function updateCitizen(partialCitizen){
    await delay(2000);
    const { id, ...restData } = partialCitizen;
    const needIndex = citizens.findIndex(citizen => citizen.id === id);
    if (needIndex > -1) {
        const newData = {
            ...citizens[needIndex],
            ...restData,
        }
        newData.educationStatus = getEducationStatus(newData);
        citizens[needIndex] = newData;
    } else {
        throw new Error("Не удалось выполнить редактирование");
    };
}

function getEducationStatus(citizen){
    const { education } = citizen;
    if(!Array.isArray(education)){
        return citizen.educationStatus;
    }
    const completeEdus = education.filter(({ endDate }) => endDate !== toPresent );
    if(!completeEdus.length){
        return "Нет"
    }
    completeEdus.sort((a,b)=>{
        const aLevel = eduParity[a.level]??-1;
        const bLevel = eduParity[b.level]??-1;
        return bLevel - aLevel;
    })
    
    return completeEdus[0].level;
}