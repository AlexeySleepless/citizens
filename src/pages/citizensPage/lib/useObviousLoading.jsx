import { useEffect, useState } from "react";

export const useObviousLoading = (isFetching, dependenies) => {
    const [obviousLoading, setObviousLoading] = useState(isFetching);
    useEffect(()=>{
        //запускаем загрузку при изменении параметров
        setObviousLoading(true)
    }, [...dependenies])

    useEffect(()=>{
        if(!isFetching){
            //останавливаем индикатор загрузки, когда
            //а) при смене данных не произошло запроса
            //б) запрос произошел и завершился
            setObviousLoading(false);
        }
    }, [isFetching, ...dependenies])
    
    return [obviousLoading, setObviousLoading];
}